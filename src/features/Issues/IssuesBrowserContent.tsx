import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import SpinnerLoader from "../../components/SpinnerLoader"
import { useSuspenseQuery } from "@apollo/client/react"
import type { IIssuesData, ISearchIssuesData } from "../../types/home"
import { GET_ISSUES, SEARCH_ISSUES } from "../../apollo/queries"
import ItemsSearch from "../../components/ItemsSearch"
import Dropdown from "../../components/Dropdown"
import IssueList from "./IssueList"

const sortOptions = [
    { value: 'CREATED_AT', label: 'Created (desc)' },
    { value: 'UPDATED_AT', label: 'Updated (desc)' },
    { value: 'COMMENTS', label: 'Comments (desc)' },
]

export default () => {
    const [search, setSearch] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')
    const [issueState, setIssueState] = useState<'OPEN' | 'CLOSED' | 'ALL'>('ALL')
    const [selectedSorting, setSelectedSorting] = useState<string>('CREATED_AT')
    const [isPaging, setIsPaging] = useTransition()

    const sentinelRef = useRef<HTMLDivElement | null>(null)

    const searchIsActive = submittedSearch.length > 0
    const sortByUpdatedAt = selectedSorting === 'UPDATED_AT'
    
    const { data, fetchMore } = useSuspenseQuery<IIssuesData | ISearchIssuesData>(
        searchIsActive ? SEARCH_ISSUES : GET_ISSUES,
        {
          variables: searchIsActive
            ? {
              query: `repo:facebook/react is:issue ${issueState === 'ALL' ? '' : 'is:' + issueState.toLowerCase()} sort:${selectedSorting} ${submittedSearch}`,
              includeUpdatedAt: sortByUpdatedAt
            }
            : {
              state: issueState === 'ALL' ? ['OPEN', 'CLOSED'] : [issueState],
              orderBy: selectedSorting,
              includeUpdatedAt: sortByUpdatedAt
            }
        }
    )
    
    const issues = searchIsActive
      ? (data as ISearchIssuesData)?.search.nodes
      : (data as IIssuesData)?.repository.issues.nodes
    const pageInfo = searchIsActive
      ? (data as ISearchIssuesData)?.search.pageInfo
      : (data as IIssuesData)?.repository.issues.pageInfo
    
    const loadMoreIssues = useCallback(async () => {
      if (!pageInfo?.hasNextPage) return
      
      setIsPaging(async () => {
          await fetchMore({
          variables: { after: pageInfo.endCursor },
          updateQuery(prev, { fetchMoreResult }) {
            if (!fetchMoreResult) return prev
    
            const prevEdges = searchIsActive
              ? (prev as ISearchIssuesData)?.search.nodes
              : (prev as IIssuesData)?.repository.issues.nodes
            const newEdges = searchIsActive
              ? (fetchMoreResult as ISearchIssuesData)?.search.nodes
              : (fetchMoreResult as IIssuesData)?.repository.issues.nodes
    
            if (searchIsActive) {
              return {
                search: {
                  ...(fetchMoreResult as ISearchIssuesData).search,
                  nodes: [...prevEdges, ...newEdges],
                }
              }
            }
    
            return  {
              repository: {
                ...(prev as IIssuesData).repository,
                issues: {
                  ...(fetchMoreResult as IIssuesData).repository.issues,
                  nodes: [...prevEdges, ...newEdges],
                },
              },
            }
          }
        })
      })
      
    }, [fetchMore, pageInfo?.endCursor, pageInfo?.hasNextPage, searchIsActive])
    
    useEffect(() => {
      const el = sentinelRef.current
      if (!el) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && pageInfo?.hasNextPage) {
            loadMoreIssues()
          }
        });
      }, { rootMargin: '200px' })
      io.observe(el);
      return () => io.disconnect()
    }, [pageInfo?.hasNextPage, loadMoreIssues])

    return <>
      <ItemsSearch 
        value={search} 
        setValue={setSearch} 
        onSearch={() => setSubmittedSearch(search)}
        clearSearch={() => {
          setSearch('')
          setSubmittedSearch('')
        }}
        searchIsActive={searchIsActive}
      />

      <div className="divide-y border rounded-md border-gray-700">
        <div className="px-4 flex flex-col  sm:flex-row gap-2 sm:gap-0 items-center sm:justify-between py-2 bg-indigo-100 rounded-t-md">
          <div className="flex flex-col sm:flex-row gap-2"> 
            <span 
              className={`py-1 px-2 cursor-pointer rounded-md hover:bg-indigo-200 text-sm ${issueState === 'ALL' ? 'font-bold   text-gray-900' : 'text-gray-700 font-normal'}`}
              onClick={() => setIssueState('ALL')}
            > 
              All 
            </span>
            <span 
              className={`py-1 px-2 cursor-pointer rounded-md hover:bg-indigo-200 text-sm ${issueState === 'OPEN' ? 'font-bold   text-gray-900' : 'text-gray-700 font-normal'}`}
              onClick={() => setIssueState('OPEN')}
            > 
              Open 
            </span>
            <span className={`py-1 px-2 cursor-pointer rounded-md hover:bg-indigo-200 text-sm ${issueState === 'CLOSED' ? 'font-bold   text-gray-900' : 'text-gray-700'}`} onClick={() => setIssueState('CLOSED')}> Closed </span>
          </div>
          <Dropdown
            options={sortOptions}
            value={selectedSorting}
            onChange={(newSorting: string) => setSelectedSorting(newSorting as string)}
            id="sort-issues-dropdown"
          />
        </div>
        <IssueList issues={issues} />
      </div>  

      <div ref={sentinelRef}></div> 

      { isPaging && 
          <SpinnerLoader />
      }
    </>
}
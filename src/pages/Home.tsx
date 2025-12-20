import { useSuspenseQuery } from "@apollo/client/react"
import { GET_ISSUES, SEARCH_ISSUES } from "../apollo/queries"
import IssueList from "../components/ItemsList"
import type { IIssuesData, ISearchIssuesData } from "../types/home"
import ItemsSearch from "../components/ItemsSearch"
import { useState } from "react"
import NewDropdown from "../components/NewDropdown"

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

    const searchIsActive = submittedSearch.length > 0

    const { data } = useSuspenseQuery<IIssuesData | ISearchIssuesData>(
        searchIsActive ? SEARCH_ISSUES : GET_ISSUES,
        {
          variables: searchIsActive
            ? {
              query: `repo:facebook/react is:issue ${issueState === 'ALL' ? '' : 'is:' + issueState.toLowerCase()} sort:${selectedSorting} ${submittedSearch}`,
            }
            : {
              state: issueState === 'ALL' ? ['OPEN', 'CLOSED'] : [issueState],
              orderBy: selectedSorting
            },
        }
    )

    const issues = searchIsActive
      ? (data as ISearchIssuesData)?.search.nodes
      : (data as IIssuesData)?.repository.issues.nodes

    return <div className="p-4 flex flex-col gap-4">
        <h1 className="pl-4 text-xl font-medium"> React issues browser </h1>
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
        <div className="px-4 flex justify-between">
          <div className="flex gap-2"> 
            <span 
              className={`py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100 text-sm ${issueState === 'ALL' ? 'font-bold text-gray-900' : 'text-gray-700 font-normal'}`}
              onClick={() => setIssueState('ALL')}
            > 
              All 
            </span>
            <span 
              className={`py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100 text-sm ${issueState === 'OPEN' ? 'font-bold text-gray-900' : 'text-gray-700 font-normal'}`}
              onClick={() => setIssueState('OPEN')}
            > 
              Open 
            </span>
            <span className={`py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100 text-sm ${issueState === 'CLOSED' ? 'font-bold text-gray-900' : 'text-gray-700'}`} onClick={() => setIssueState('CLOSED')}> Closed </span>
          </div>
          <NewDropdown 
            options={sortOptions}
            value={selectedSorting}
            onChange={(newSorting) => setSelectedSorting(newSorting as string)}
            id="sort-issues-dropdown"
          />
        </div>
        <IssueList issues={issues} />
    </div>
}
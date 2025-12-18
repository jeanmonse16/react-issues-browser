import { useSuspenseQuery } from "@apollo/client/react"
import { GET_ISSUES, SEARCH_ISSUES } from "../apollo/queries"
import IssueList from "../components/ItemsList"
import type { IIssuesData, ISearchIssuesData } from "../types/home"
import ItemsSearch from "../components/ItemsSearch"
import { useState } from "react"

export default () => {
    const [search, setSearch] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')
    const [issueState, setIssueState] = useState<'OPEN' | 'CLOSED' | 'ALL'>('OPEN')

    const searchIsActive = submittedSearch.length > 0

    const { data } = useSuspenseQuery<IIssuesData | ISearchIssuesData>(
        searchIsActive ? SEARCH_ISSUES : GET_ISSUES,
        {
          variables: searchIsActive
            ? {
              query: `repo:facebook/react is:issue is:${issueState} ${submittedSearch}`,
            }
            : {
              state: [issueState],
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
        <div className="pl-4 flex gap-2"> 
            <span 
              className={`py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100 text-sm ${issueState === 'OPEN' ? 'font-semibold text-gray-900' : 'text-gray-700 font-normal'}`}
              onClick={() => setIssueState('OPEN')}
            > 
              Open 
            </span>
            <span className={`py-1 px-2 cursor-pointer rounded-md hover:bg-gray-100 text-sm ${issueState === 'CLOSED' ? 'font-semibold text-gray-900' : 'text-gray-700'}`} onClick={() => setIssueState('CLOSED')}> Closed </span>
        </div>
        <IssueList issues={issues} />
    </div>
}
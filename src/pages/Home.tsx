import { useSuspenseQuery } from "@apollo/client/react"
import { GET_ISSUES, SEARCH_ISSUES } from "../apollo/queries"
import IssueList from "../components/ItemsList"
import type { IIssuesData, ISearchIssuesData } from "../types/home"
import ItemsSearch from "../components/ItemsSearch"
import { useState } from "react"

export default () => {
    const [search, setSearch] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')

    const searchIsActive = submittedSearch.length > 0

    const { data } = useSuspenseQuery<IIssuesData | ISearchIssuesData>(
        searchIsActive ? SEARCH_ISSUES : GET_ISSUES,
        {
          variables: searchIsActive
            ? {
              query: `repo:facebook/react is:issue ${submittedSearch}`,
            }
            : undefined
        }
    )

    const issues = searchIsActive
      ? (data as ISearchIssuesData)?.search.nodes
      : (data as IIssuesData)?.repository.issues.nodes

    return <div className="p-4 flex flex-col gap-4">
        <h1 className="px-4 text-xl font-medium"> React issues browser </h1>
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
        <IssueList issues={issues} />
    </div>
}
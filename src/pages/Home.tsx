import { useSuspenseQuery } from "@apollo/client/react"
import { GET_ISSUES } from "../apollo/queries"
import IssueList from "../components/ItemsList"
import type { IIssuesData } from "../types/home"

export default () => {
    const { data } = useSuspenseQuery<IIssuesData | undefined>(
        GET_ISSUES
    )

    return <div className="p-4 flex flex-col gap-4">
        <h1 className="px-4 text-xl font-medium"> React issues browser </h1>
        <IssueList issues={data?.repository.issues.nodes} />
    </div>
}
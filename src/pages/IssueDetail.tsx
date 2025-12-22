import { NavLink } from "react-router"
import ErrorBoundary from "../components/ErrorBoundary"
import { Suspense } from "react"
import IssueDetailContent from "../features/IssueDetail/IssueDetailContent"
import IssueDetailLoader from "../features/IssueDetail/IssueDetailLoader"

export default () => {
    return <div className="h-full bg-white pr-4 pl-8 py-4 flex flex-col gap-4">
        <div>
            <NavLink to="/issues" className="text-indigo-500 text-sm hover:underline">  ← Back to Issues List</NavLink>
        </div>

        <ErrorBoundary>
            <Suspense fallback={<IssueDetailLoader />}>
                <IssueDetailContent />
            </Suspense>
        </ErrorBoundary>
        
    </div>
}
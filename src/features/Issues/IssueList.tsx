import { NavLink } from "react-router"
import Chat from "../../assets/icons/Chat"
import CheckCircle from "../../assets/icons/CheckCircle"
import ExclamationCircle from "../../assets/icons/ExclamationCircle"
import type { IIssuesNodes } from "../../types/home"
import formatSmartDate from "../../utilities/formatSmartDate"

const STATE_ICONS: Record<string, React.ReactNode> = {
  OPEN: <span className="hidden sm:block text-gray-500"><ExclamationCircle /></span>,
  CLOSED: <span className="hidden sm:block text-green-600"><CheckCircle /></span>
}

export default function IssueList({ issues }: { issues: IIssuesNodes | undefined }) {
  if (!issues || issues.length === 0) {
    return <p className="p-4 text-sm">No issues found.</p>
  }
  return (
    <ul className="divide-y">
      {
        issues.map(issue => (

          <NavLink key={issue.id} to={"/issues/" + issue.number} className="p-4 hover:bg-indigo-50 cursor-pointer flex flex-col sm:flex-row gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              {STATE_ICONS[issue.state]}
              <div >
                <p className="font-medium">
                  {issue.title}
                </p>
                <p className="text-sm text-gray-500 pt-2 sm:pt-0">
                  #{issue.number} · {issue.author.login} opened {formatSmartDate(issue.createdAt)} 
                  {
                    issue.updatedAt ? ` · Updated ${formatSmartDate(issue.updatedAt)}` : ''
                  }
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 items-start text-gray-500">
              <Chat />
              <p>{ issue.comments.totalCount }</p>
            </div>
            
          </NavLink>
        ))
      }
    </ul>
  )
}
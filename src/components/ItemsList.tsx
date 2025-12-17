import type { IIssuesNodes } from "../types/home";

export default function IssueList({ issues }: { issues: IIssuesNodes | undefined }) {
  if (!issues || issues.length === 0) {
    return <p>No issues found.</p>
  }
  return (
    <ul className="divide-y">
      {
        issues.map(issue => (
          <li key={issue.id} className="p-4 hover:bg-gray-50 cursor-pointer">
            <a href={`/issue/${issue.number}`} className="font-medium">
              {issue.title}
            </a>
            <p className="text-sm text-gray-500">
              {issue.comments.totalCount} comments
            </p>
          </li>
        ))
      }
    </ul>
  )
}
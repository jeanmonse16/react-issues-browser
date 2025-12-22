import { useSuspenseQuery } from "@apollo/client/react"
import { useParams } from "react-router"
import { GET_ISSUE_DETAIL } from "../../apollo/queries"
import CheckCircle from "../../assets/icons/CheckCircle"
import type { IIssueDetail } from "../../types/issueDetail"
import formatSmartDate from "../../utilities/formatSmartDate"
import ExclamationCircle from "../../assets/icons/ExclamationCircle"
import CommentCard from "../../components/CommentCard"

const ISSUE_STATUS_ICONS: Record<string, React.ReactNode> = {
  OPEN: <ExclamationCircle />,
  CLOSED: <CheckCircle />
}

export default () => {
    const { issueId } = useParams<{ issueId: string }>()
    const { data } = useSuspenseQuery<IIssueDetail>(GET_ISSUE_DETAIL, {
        variables: {
            number: Number(issueId)
        }
    })

    return <>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-between">
        <h2 className="text-2xl font-bold">
            {data.repository.issue.title}
            <span className="text-gray-500 font-normal"> #{issueId}</span>
        </h2>
        <div className={`w-max h-max text-sm gap-2 flex items-center ${data.repository.issue.state === "OPEN" ? "bg-indigo-400" : "bg-green-600" } text-white px-2 py-1 rounded`}>
            {ISSUE_STATUS_ICONS[data.repository.issue.state]}
            <span>{data.repository.issue.state}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <CommentCard
          avatarUrl={data.repository.issue.author.avatarUrl}
          login={data.repository.issue.author.login}
          createdAt={data.repository.issue.createdAt}
          bodyHTML={data.repository.issue.bodyHTML}
          isIssueAuthor={true}
        />

        <h3 className="text-xl font-medium text-gray-900">Comments</h3>

        { 
          data.repository.issue.comments.nodes.length === 0 
            ? <p className="text-gray-500">No comments yet.</p> 
            : data.repository.issue.comments.nodes.map(comment => 
                <CommentCard key={comment.id}
                  avatarUrl={comment.author.avatarUrl}
                  login={comment.author.login}
                  createdAt={comment.createdAt}
                  bodyHTML={comment.bodyHTML}
                  isIssueAuthor={comment.author.login === data.repository.issue.author.login}
                />
            )
        }
      </div>
    </>
}
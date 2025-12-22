import formatSmartDate from "../utilities/formatSmartDate"

interface ICommentCardProps {
    avatarUrl: string
    login: string
    createdAt: string
    bodyHTML: string
    isIssueAuthor: boolean
}

export default (props: ICommentCardProps) => {
    return <div className="flex gap-4">
      <div 
        className="hidden shrink-0 sm:block h-10 w-10 rounded-full bg-cover border border-gray-400" 
        style={{backgroundImage: `url(${props.avatarUrl})`}} 
      />
      <div className="border border-gray-400  divide-y divide-gray-400 rounded-md w-full overflow-x-auto">
        <div className="px-3 py-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between sm:items-center bg-indigo-100 rounded-t-md">
            <p className="text-sm font-medium">
                {props.login} 
                <span className="text-gray-600 font-normal"> opened {formatSmartDate(props.createdAt)}  </span>
            </p>
            <div className="w-max px-2 bg-indigo-200 border border-gray-400 rounded-md text-sm font-medium text-gray-600"> {props.isIssueAuthor ? "Author" : "Participant"} </div>
        </div>
        <div className="text-sm px-3 py-4">
            <div className="max-w-full break-words" dangerouslySetInnerHTML={{__html: props.bodyHTML}}></div>
        </div>
      </div>  
    </div>
}
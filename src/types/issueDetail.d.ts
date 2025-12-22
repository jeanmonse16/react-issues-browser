export interface IIssueDetail {
    repository: {
        issue: {
            id: string
            number: number
            title: string
            body: string
            bodyHTML: string
            state: string
            createdAt: string
            author: {
                __typename: string
                login: string
                avatarUrl: string
            }
            comments: {
                totalCount: number
                nodes: Array<{
                    id: string
                    body: string
                    bodyHTML: string
                    createdAt: string
                    author: {
                        __typename: string
                        login: string
                        avatarUrl: string
                    }
                }>
            }
        }
    }
}
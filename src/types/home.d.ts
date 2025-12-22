export type IIssuesNodes = Array<{
    id: string
    number: number
    title: string
    state: 'OPEN' | 'CLOSED'
    comments: {
        totalCount: number
    }
    author: {
        login: string
    }
    editor
    createdAt: string
    updatedAt?: string
}>

export interface IIssuesData { 
    repository: { 
        issues: { 
            nodes: IIssuesNodes,
            pageInfo: {
                hasNextPage: boolean,
                endCursor: string | null
            }
        } 
    } 
}

export interface ISearchIssuesData { 
    search: { 
        nodes: IIssuesNodes,
        pageInfo: {
            hasNextPage: boolean,
            endCursor: string | null
        }
    } 
}
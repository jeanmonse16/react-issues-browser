export type IIssuesNodes = Array<{
    id: string;
    number: number;
    title: string;
    comments: {
        totalCount: number;
    };
}>

export interface IIssuesData { 
    repository: { 
        issues: { 
            nodes: IIssuesNodes
        } 
    } 
}
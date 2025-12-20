import { gql } from "@apollo/client"

export const GET_ISSUES = gql`
  query GetIssues ($state: [IssueState!], $orderBy: IssueOrderField!) {
    repository(owner: "facebook", name: "react") {
      issues(first: 15, orderBy: {field: $orderBy, direction: DESC}, states: $state) {
        nodes {
          id
          number
          title
          state
          createdAt
          updatedAt
          comments {
            totalCount
          }
        }
      }
    }
  }
`

export const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!) {
    search(type: ISSUE, query: $query, first: 15) {
      nodes {
        ... on Issue {
          id
          number
          title
          state
          createdAt
          updatedAt
          comments {
            totalCount
          }
        }
      }
    }
  }
`;
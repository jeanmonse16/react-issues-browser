import { gql } from "@apollo/client"

export const GET_ISSUES = gql`
  query GetIssues {
    repository(owner: "facebook", name: "react") {
      issues(first: 15, orderBy: {field: CREATED_AT, direction: DESC}) {
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
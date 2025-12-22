import { gql } from "@apollo/client"

export const GET_ISSUES = gql`
  query GetIssues ($state: [IssueState!], $orderBy: IssueOrderField!, $includeUpdatedAt: Boolean!, $after: String) {
    repository(owner: "facebook", name: "react") {
      id
      issues(first: 15, orderBy: {field: $orderBy, direction: DESC}, states: $state, after: $after) {
        nodes {
          id
          number
          title
          state
          author {
            login
          }
          createdAt
          updatedAt @include(if: $includeUpdatedAt)
          comments {
            totalCount
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!, $includeUpdatedAt: Boolean!, $after: String) {
    search(type: ISSUE, query: $query, first: 15, after: $after) {
      nodes {
        ... on Issue {
          id
          number
          title
          state
          author {
            login
          }
          createdAt
          updatedAt @include(if: $includeUpdatedAt)
          comments {
            totalCount
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const GET_ISSUE_DETAIL = gql`
  query GetIssueDetail($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        id
        number
        title
        body
        bodyHTML
        state
        createdAt
        author {
          __typename
          login
          ... on User {
            avatarUrl(size: 80)
          }
          ... on Organization {
            avatarUrl(size: 80)
          }
          ... on Bot {
            avatarUrl(size: 80)
          }
        }

        comments(first: 10) {
          totalCount
          nodes {
            id
            body
            bodyHTML
            createdAt
            author {
              __typename
              login
              ... on User {
                avatarUrl(size: 40)
              }
              ... on Organization {
                avatarUrl(size: 40)
              }
              ... on Bot {
                avatarUrl(size: 40)
              }
            }
          }

        }
      }
    }
  }
`
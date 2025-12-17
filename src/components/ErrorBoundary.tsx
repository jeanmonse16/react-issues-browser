import * as React from 'react'
import ErrorMessage from './ErrorMessage'

import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  LocalStateError,
  ServerError,
  ServerParseError,
  UnconventionalError,
} from "@apollo/client/errors"

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    error: unknown | null
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }
 
  
  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  retry () {
    window.location.reload()
  }

  render() {

    if (this.state.error) {
      if (this.state.error instanceof CombinedGraphQLErrors) {
        return <ErrorMessage title='A query error occured' message={this.state.error.errors[0].message} onRetry={this.retry} />
      }
      else return <ErrorMessage onRetry={this.retry} />
    }

    return this.props.children
  }
}
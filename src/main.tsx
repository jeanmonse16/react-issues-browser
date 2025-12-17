import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './apollo/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </StrictMode>
)
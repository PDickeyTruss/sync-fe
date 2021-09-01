import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'App'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ThemeProvider} from 'theme'

const queryConfig = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
  },
}

const queryClient = new QueryClient(queryConfig)

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </QueryClientProvider>,
  document.getElementById('root'),
)

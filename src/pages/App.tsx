import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'

import client from '../util/apollo'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default hot(App)

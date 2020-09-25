import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Home'

import client from '../util/apollo'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default hot(App)

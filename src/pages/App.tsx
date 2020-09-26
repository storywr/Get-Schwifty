import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Dashboard from './Dashboard'

import client from '../util/apollo'

const App = () => {
  const [dark, setDark] = useState(false)

  const darkTheme = createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light'
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path='/'>
              <Dashboard
                dark={dark}
                setDark={setDark}
              />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default hot(App)

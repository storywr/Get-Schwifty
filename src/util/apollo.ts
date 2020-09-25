import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache,  } from '@apollo/client'

import Config from '../config'

const httpLink = new HttpLink({
  uri: Config.GRAPHQL_URL
})

const loggerLink = new ApolloLink((operation, forward) => (
  forward(operation).map((response) => {

    return response
  })
))

const httpLinkWithMiddleware = loggerLink.concat(httpLink)

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    httpLinkWithMiddleware
  ]),
  resolvers: {}
})

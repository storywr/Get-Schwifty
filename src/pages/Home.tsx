import React from 'react'
import { gql, useQuery } from '@apollo/client'

const LIST_CHARACTERS = gql`
  query ListCharacters {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
  }
`

const Home = () => {
  const query = useQuery<any>(LIST_CHARACTERS)

  return (
    <>
      testing 123
    </>
  )
}

export default Home
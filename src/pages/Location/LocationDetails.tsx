import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import { Typography } from '@material-ui/core'

const Wrapper = styled.div`
  display: 'flex';
  flex-wrap: 'wrap';
  justify-content: 'space-around';
  overflow: 'hidden';
  margin-top: 2rem;
`

const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      dimension
      type
      residents {
        id
        image
        name
        gender
        species
        status
        episode {
          id
          name
          episode
          air_date
        }
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`

interface Character {
  id: string | number
  name: string
  image: string
  species: string
  status: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
}

const LocationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory()

  const { data } = useQuery(GET_LOCATION, {
    variables: { id: id! }
  })

  return (
    <>
      {data ?
        <>
          <Typography
            variant='h2'
          >
            {data.location.name}
          </Typography>
          <Typography
            variant='h4'
          >
            {data.location.dimension}
          </Typography>
          <Typography
            variant='h6'
            gutterBottom
          >
            {data.location.type}
          </Typography>
          <Wrapper>
            <GridList cols={7}>
              {data.location.residents.map((character: Character) => (
                <GridListTile key={character.id}>
                  <img src={character.image} alt={character.name} />
                  <GridListTileBar
                    title={character.name}
                    actionIcon={
                      <IconButton
                        aria-label={`star ${character.name}`}
                        onClick={() => history.push(`/character/${character.id}`)}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Wrapper>
        </>
      :
        <LinearProgress />
      }
    </>
  )
}

export default LocationDetails
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { DataGrid } from '@material-ui/data-grid';

const Wrapper = styled.div`
  width: 800px;
  height: 500px;
`

const StyledCard = styled(Card)`
  width: 400px;
  height: 600px;
`

const StyledCardGrid = styled(Card)`
  width: 800px;
  height: 600px;
`

const StyledDataGrid = styled(DataGrid)`
  border: none;
  .MuiDataGrid-row {
    cursor: pointer;
  }
`

const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
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

const columns = [
  { field: 'name', headerName: 'Name', width: 275 },
  { field: 'species', headerName: 'Species', width: 250},
  { field: 'origin', headerName: 'Origin', width: 250},
]

interface Character {
  id: string | number
  name: string
  species: string
  status: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
}

const EpisodeDetails = () => {
  const { id } = useParams()
  const history = useHistory()

  const { data, error, loading } = useQuery(GET_EPISODE, {
    variables: { id: id! }
  })

  const getRows = (data: any) => (
    data.episode.characters.map(({ location, origin, ...rest }: Character) => ({
      location: location.name,
      origin: origin.name,
      ...rest
    }))
  )

  return (
    <>
      {data ?
        <Grid
          container
          spacing={4}
          alignItems='stretch'
          justify='center'
        >
          <Grid item>
            <StyledCard>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={data.episode.name}
                subheader={data.episode.episode}
              />
            </StyledCard>
          </Grid>
          <Grid item>
            <StyledCardGrid>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title='Characters'
              />
              <Wrapper>
                <StyledDataGrid
                  disableSelectionOnClick
                  rows={getRows(data)}
                  columns={columns}
                  pageSize={20}
                  onRowClick={row => history.push(`/character/${row.data.id}`)}
                />
              </Wrapper>
            </StyledCardGrid>
          </Grid>
        </Grid>
      :
        <LinearProgress />
      }
    </>
  )
}

export default EpisodeDetails
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { DataGrid } from '@material-ui/data-grid';
import { Typography } from '@material-ui/core'

const Wrapper = styled.div`
  width: 800px;
  height: 500px;
`

const ListWrapper = styled.div`
  justify-content: center;
`

const StyledCard = styled(Card)`
  width: 300px;
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

const StyledCardMedia = styled(CardMedia)`
  height: 300px;
  width: 300px;
`

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
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
`

const columns = [
  { field: 'name', headerName: 'Name', width: 325 },
  { field: 'episode', headerName: 'Episode', width: 225},
  { field: 'air_date', headerName: 'Air Date', width: 225}
]

const CharacterDetails = () => {
  const { id } = useParams()
  const history = useHistory()

  const { data, error, loading } = useQuery(GET_CHARACTER, {
    variables: { id: id! }
  })

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
                title={data.character.name}
                subheader={data.character.origin.name}
              />
              <StyledCardMedia
                image={data.character.image}
                title={data.character.name}
              />
              <CardContent>
                <Typography gutterBottom variant='body1' align='left'>Species: {data.character.species}</Typography>
                <Typography gutterBottom variant='body1' align='left'>Gender: {data.character.gender}</Typography>
                <Typography gutterBottom variant='body1' align='left'>Status: {data.character.status}</Typography>
                <Typography gutterBottom variant='body1' align='left'>Last known location: {data.character.location.name}</Typography>
              </CardContent>
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
                title='Episodes'
              />
              <Wrapper>
                <StyledDataGrid
                  disableSelectionOnClick
                  rows={data.character.episode}
                  columns={columns}
                  pageSize={20}
                  onRowClick={row => history.push(`/episode/${row.data.id}`)}
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

export default CharacterDetails
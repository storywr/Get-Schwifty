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

const StyledCardMedia = styled(CardMedia)`
  height: 400px;
  width: 400px;
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
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={data.character.species}
                          secondary='species'
                        />
                        <ListItemText
                          primary={data.character.gender}
                          secondary='gender'
                        />
                        <ListItemText
                          primary={data.character.status}
                          secondary='status'
                        />
                      </ListItem>
                    </List>
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
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField'

import { DataGrid } from '@material-ui/data-grid';

import useDebouncedValue from '../../hooks/useDebouncedValue'

const Wrapper = styled.div`
  height: 700px;
  width: 100%;
`

const StyledTextField = styled(TextField)`
  margin-bottom: 2rem;
`

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-row {
    cursor: pointer;
  }
`

const columns = [
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'episode', headerName: 'Episode', width: 300},
  { field: 'air_date', headerName: 'Air Date', width: 300}
]

const LIST_EPISODES = gql`
  query ListEpisodes($name: String, $page: Int) {
    episodes(filter: { name: $name}, page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`

const EpisodeList = () => {
  const history = useHistory()
  const [getEpisodes, { loading, data }] = useLazyQuery<any>(LIST_EPISODES)
  const [page, setPage] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getEpisodes({ variables: { name, page } })
  }, [debouncedValue, page, getEpisodes, name])

  const getGrid = () => {
    if (loading) {
      return <LinearProgress />
    } else if (data) {
      return (
        <StyledDataGrid
          page={page}
          onPageChange={(params: any) => setPage(params.page)}
          pageSize={20}
          rowCount={data.episodes.info.count}
          pagination
          paginationMode='server'
          rows={data.episodes.results}
          columns={columns}
          onRowClick={(row: any) => history.push(`/episode/${row.id}`)}
          loading={loading}
        />
      )  
    }
    return <Typography>No data found</Typography>
  }

  return (
    <Wrapper>
      <StyledTextField
        fullWidth
        id="filled-name"
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        variant='outlined'
      />
      {getGrid()}
    </Wrapper>
  )
}

export default EpisodeList
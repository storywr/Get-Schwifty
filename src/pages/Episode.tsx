import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'

import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField'

import { DataGrid } from '@material-ui/data-grid';

import useDebouncedValue from '../hooks/useDebouncedValue'

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
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'episode', headerName: 'Episode', width: 250},
  { field: 'air_date', headerName: 'Air Date', width: 250}
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

const Episode = () => {
  const [getEpisodes, { loading, data }] = useLazyQuery<any>(LIST_EPISODES)
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getEpisodes({ variables: { name, page } })
    // eslint-disable-next-line
  }, [debouncedValue, page])

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
      {!loading && data ?
        <StyledDataGrid
          page={page}
          onPageChange={params => setPage(params.page)}
          pageSize={20}
          rowCount={data.episodes.info.count}
          pagination
          paginationMode='server'
          rows={data.episodes.results}
          columns={columns}
          onRowClick={row => console.log(row)}
          loading={loading}
        />
      :
        <LinearProgress />
      }
    </Wrapper>
  )
}

export default Episode
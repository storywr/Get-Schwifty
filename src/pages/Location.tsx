import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

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
  { field: 'name', headerName: 'Name', width: 325 },
  { field: 'dimension', headerName: 'Dimension', width: 325},
  { field: 'type', headerName: 'Type', width: 225}
]

const LIST_LOCATIONS = gql`
  query ListLocations($name: String, $page: Int) {
    locations(filter: { name: $name}, page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        dimension
        type
      }
    }
  }
`

const Location = () => {
  const history = useHistory()
  const [getLocations, { loading, data }] = useLazyQuery<any>(LIST_LOCATIONS)
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getLocations({ variables: { name, page } })
  }, [debouncedValue, page])

  return (
    <>
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
            rowCount={data.locations.info.count}
            pagination
            paginationMode='server'
            rows={data.locations.results}
            columns={columns}
            onRowClick={row => history.push(`/location/${row.data.id}`)}
            loading={loading}
          />
        :
          <LinearProgress />
        }
      </Wrapper>
    </>
  )
}

export default Location
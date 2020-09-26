import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { DataGrid } from '@material-ui/data-grid';
import useDebouncedValue from '../hooks/useDebouncedValue'

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
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'dimension', headerName: 'Dimension', width: 200}
]

const LIST_LOCATIONS = gql`
  query ListLocations($name: String) {
    locations(filter: { name: $name}) {
      info {
        count
      }
      results {
        id
        name
        dimension
      }
    }
  }
`

const Location = () => {
  const [getLocations, query] = useLazyQuery<any>(LIST_LOCATIONS)
  const [name, setName] = useState('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getLocations({ variables: { name } })
  }, [debouncedValue])

  return (
    <>
      <div style={{ height: 700, width: '100%' }}>
        <StyledTextField
          fullWidth
          id="filled-name"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          variant='outlined'
        />
        {query && query.data &&
          <StyledDataGrid
            rows={query.data.locations.results}
            columns={columns}
            pageSize={10}
            onRowClick={row => console.log(row)}
          />
        }
      </div>
    </>
  )
}

export default Location
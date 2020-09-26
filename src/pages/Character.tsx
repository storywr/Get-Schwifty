import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'
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
  { field: 'species', headerName: 'Species', width: 200}
]

const LIST_CHARACTERS = gql`
  query ListCharacters($name: String, $page: Int) {
    characters(filter: { name: $name}, page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        species
      }
    }
  }
`

const Character = () => {
  const [getCharacters, { called, loading, data }] = useLazyQuery<any>(LIST_CHARACTERS)
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getCharacters({ variables: { name, page } })
  }, [debouncedValue, page])

  return (
    <>
      <div style={{ height: 700, width: '100%' }}>
        <StyledTextField
          fullWidth
          id="filled-name"
          label="Name"
          value={name}
          onChange={e => {
            setPage(1)
            setName(e.target.value)
          }}
          variant='outlined'
        />
        {data &&
          <StyledDataGrid
            page={page}
            onPageChange={params => setPage(params.page)}
            pageSize={20}
            rowCount={data.characters.info.count}
            pagination
            paginationMode='server'
            rows={data.characters.results}
            columns={columns}
            onRowClick={row => console.log(row)}
            loading={loading}
          />
        }
      </div>
    </>
  )
}

export default Character
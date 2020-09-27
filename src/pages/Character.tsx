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
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'species', headerName: 'Species', width: 150},
  { field: 'status', headerName: 'Status', width: 150},
  { field: 'origin', headerName: 'Origin', width: 275},
  { field: 'location', headerName: 'Last Location', width: 275},
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
        status
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
  species: string
  status: string
  origin: {
    name: string
  }
  location: {
    name: string
  }
}

const Character = () => {
  const history = useHistory()
  const [getCharacters, { loading, data }] = useLazyQuery<any>(LIST_CHARACTERS)
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getCharacters({ variables: { name, page } })
  }, [debouncedValue, page])

  const getRows = (data: any) => (
    data.characters.results.map(({ location, origin, ...rest }: Character) => ({
      location: location.name,
      origin: origin.name,
      ...rest
    }))
  )

  return (
    <Wrapper>
      <StyledTextField
        fullWidth
        id="filled-name"
        label="Name"
        variant='outlined'
        value={name}
        onChange={e => {
          setPage(1)
          setName(e.target.value)
        }}
      />
      {!loading && data ?
        <StyledDataGrid
          page={page}
          onPageChange={params => setPage(params.page)}
          pageSize={20}
          rowCount={data.characters.info.count}
          pagination
          paginationMode='server'
          rows={getRows(data)}
          columns={columns}
          onRowClick={row => history.push(`/character/${row.data.id}`)}
          loading={loading}
        />
      :
        <LinearProgress />
      }
    </Wrapper>
  )
}

export default Character
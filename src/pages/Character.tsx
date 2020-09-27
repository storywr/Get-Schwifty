import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'

import { DataGrid } from '@material-ui/data-grid'

import useDebouncedValue from '../hooks/useDebouncedValue'
import CharacterFilters from './CharacterFilters'

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
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'species', headerName: 'Species', width: 175},
  { field: 'status', headerName: 'Status', width: 175},
  { field: 'origin', headerName: 'Origin', width: 275},
  { field: 'location', headerName: 'Last Location', width: 275},
]

const LIST_CHARACTERS = gql`
  query ListCharacters(
    $name: String,
    $page: Int,
    $species: String,
    $status: String,
    $gender: String
  ) {
    characters(
      filter: {
        name: $name,
        species: $species,
        status: $status,
        gender: $gender
      },
      page: $page
    ) {
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
  const [species, setSpecies] = useState('')
  const [status, setStatus] = useState('')
  const [gender, setGender] = useState('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getCharacters({
      variables: {
        name,
        page, 
        ...species && { species },
        ...status && { status },
        ...gender && { gender }}
      })
  }, [debouncedValue, page, species, status, gender])

  const getRows = (data: any) => (
    data.characters.results.map(({ location, origin, ...rest }: Character) => ({
      location: location.name,
      origin: origin.name,
      ...rest
    }))
  )

  const clearFilters = () => {
    setSpecies('')
    setStatus('')
    setGender('')
    setPage(1)
  }

  return (
    <Wrapper>
      <CharacterFilters
        species={species}
        setSpecies={setSpecies}
        status={status}
        setStatus={setStatus}
        gender={gender}
        setGender={setGender}
        clearFilters={clearFilters}
      />
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
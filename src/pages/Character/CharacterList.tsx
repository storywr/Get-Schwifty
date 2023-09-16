import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'

import { DataGrid } from '@material-ui/data-grid'

import useDebouncedValue from '../../hooks/useDebouncedValue'
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

const CharacterList = () => {
  const history = useHistory()
  const [getCharacters, { loading, data }] = useLazyQuery<any>(LIST_CHARACTERS)
  const [page, setPage] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [species, setSpecies] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getCharacters({
      variables: {
        name,
        page, 
        ...species && { species },
        ...status && { status },
        ...gender && { gender }
      }
    })
  }, [debouncedValue, page, species, status, gender, getCharacters, name])

  const getRows = (data: any) => (
    data.characters.results.map(({ location, origin, ...rest }: Character) => ({
      location: location.name,
      origin: origin.name,
      ...rest
    }))
  )

  const resetPage = () => setPage(1)

  const clearFilters = () => {
    setSpecies('')
    setStatus('')
    setGender('')
    resetPage()
  }

  const getGrid = () => {
    if (loading) {
      return <LinearProgress />
    } else if (data) {
      return (
        <StyledDataGrid
          page={page}
          onPageChange={(params: any) => setPage(params.page)}
          pageSize={20}
          rowCount={data.characters.info.count}
          pagination
          paginationMode='server'
          rows={getRows(data)}
          columns={columns}
          onRowClick={(row: any) => history.push(`/character/${row.id}`)}
          loading={loading}
        />  
      )  
    }
    return <Typography>No data found</Typography>
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
        resetPage={resetPage}
      />
      <StyledTextField
        fullWidth
        id="filled-name"
        label="Name"
        variant='outlined'
        value={name}
        onChange={e => {
          resetPage()
          setName(e.target.value)
        }}
      />
      {getGrid()}
    </Wrapper>
  )
}

export default CharacterList
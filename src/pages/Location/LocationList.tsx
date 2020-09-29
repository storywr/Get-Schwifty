import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField'

import { DataGrid } from '@material-ui/data-grid';

import useDebouncedValue from '../../hooks/useDebouncedValue'
import LocationFilters from './LocationFilters'

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
  query ListLocations(
    $name: String,
    $type: String,
    $dimension: String,
    $page: Int
  ) {
    locations(
      filter: {
        name: $name,
        type: $type,
        dimension: $dimension
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
        dimension
        type
      }
    }
  }
`

const LocationList = () => {
  const history = useHistory()
  const [getLocations, { loading, data }] = useLazyQuery<any>(LIST_LOCATIONS)
  const [page, setPage] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [dimension, setDimension] = useState<string>('')
  const debouncedValue = useDebouncedValue(name, 1000)

  useEffect(() => {
    getLocations({
      variables: {
        name,
        page, 
        ...type && { type },
        ...dimension && { dimension },
      }
    })
  }, [debouncedValue, page, type, dimension])

  const clearFilters = () => {
    setType('')
    setDimension('')
    setPage(1)
  }

  const getGrid = () => {
    if (loading) {
      return <LinearProgress />
    } else if (data) {
      return (
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
      )
    }
    return <Typography>No data found</Typography>
  }

  return (
    <Wrapper>
      <LocationFilters
        type={type}
        setType={setType}
        dimension={dimension}
        setDimension={setDimension}
        clearFilters={clearFilters}
      />
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

export default LocationList
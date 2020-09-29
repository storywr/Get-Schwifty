import React from 'react'
import styled from 'styled-components'

import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

import Filter from '../../components/Filter'

const Filters = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

const Flex = styled.div`
  display: flex;
  flex-grow: 1;
`

const StyledChip = styled(Chip)`
  margin: 0.5rem;
`

const StyledDivider = styled(Divider)`
  margin: 0.5rem;
`

interface Props {
  type: string
  setType: (type: string) => void
  dimension: string
  setDimension: (dimension: string) => void
  clearFilters: () => void
  resetPage: () => void
}

const LocationFilters = ({
  type,
  setType,
  dimension,
  setDimension,
  clearFilters,
  resetPage
}: Props) => {
  return (
    <Flex>
      <Filters>
        <Filter
          currentAttribute={type}
          setAttribute={setType}
          label='Planet'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={type}
          setAttribute={setType}
          label='Space Station'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={type}
          setAttribute={setType}
          label='Microverse'
          resetPage={resetPage}
        />
        <StyledDivider orientation="vertical" flexItem />
        <Filter
          currentAttribute={dimension}
          setAttribute={setDimension}
          label='Replacement Dimension'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={dimension}
          setAttribute={setDimension}
          label='Dimension C-137'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={dimension}
          setAttribute={setDimension}
          label='unknown'
          resetPage={resetPage}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip variant='outlined' label='clear filters' onDelete={() => clearFilters()} />
      </Filters>
    </Flex>
  )
}

export default LocationFilters
import React from 'react'
import styled from 'styled-components'

import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

const getColor = (filter: string, attribute: string) => filter === attribute ? 'secondary' : 'default'
const getVariant = (filter: string, attribute: string) => filter === attribute ? 'default' : 'outlined'

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
}

const LocationFilters = ({ type, setType, dimension, setDimension, clearFilters }: Props) => {
  return (
    <Flex>
      <Filters>
        <StyledChip
          label='Planet'
          clickable
          onClick={() => setType('Planet')}
          color={getColor(type, 'Planet')}
          variant={type === 'Planet' ? 'default' : 'outlined'}
        />
        <StyledChip
          label='Space Station'
          clickable
          onClick={() => setType('Space Station')}
          color={getColor(type, 'Space Station')}
          variant={getVariant(type, 'Space Station')}
        />
        <StyledChip
          label='Microverse'
          clickable
          onClick={() => setType('Microverse')}
          color={getColor(type, 'Microverse')}
          variant={getVariant(type, 'Microverse')}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip
          label='Replacement Dimension'
          clickable
          onClick={() => setDimension('Replacement Dimension')}
          color={getColor(dimension, 'Replacement Dimension')}
          variant={getVariant(dimension, 'Replacement Dimension')}
        />
        <StyledChip
          label='Dimension C-137'
          clickable
          onClick={() => setDimension('Dimension C-137')}
          color={getColor(dimension, 'Dimension C-137')}
          variant={getVariant(dimension, 'Dimension C-137')}
        />
        <StyledChip
          label='unknown'
          clickable
          onClick={() => setDimension('unknown')}
          color={getColor(dimension, 'unknown')}
          variant={getVariant(dimension, 'unknown')}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip variant='outlined' label='clear filters' onDelete={() => clearFilters()} />
      </Filters>
    </Flex>
  )
}

export default LocationFilters
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
  species: string
  setSpecies: (species: string) => void
  status: string
  setStatus: (status: string) => void
  gender: string
  setGender: (gender: string) => void
  clearFilters: () => void
}

const CharacterFilters = ({ species, setSpecies, status, setStatus, gender, setGender, clearFilters }: Props) => {
  return (
    <Flex>
      <Filters>
        <StyledChip
          label='human'
          clickable
          onClick={() => setSpecies('human')}
          color={getColor(species, 'human')}
          variant={species === 'human' ? 'default' : 'outlined'}
        />
        <StyledChip
          label='alien'
          clickable
          onClick={() => setSpecies('alien')}
          color={getColor(species, 'alien')}
          variant={getVariant(species, 'alien')}
        />
        <StyledChip
          label='humanoid'
          clickable
          onClick={() => setSpecies('humanoid')}
          color={getColor(species, 'humanoid')}
          variant={getVariant(species, 'humanoid')}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip
          label='alive'
          clickable
          onClick={() => setStatus('alive')}
          color={getColor(status, 'alive')}
          variant={getVariant(status, 'alive')}
        />
        <StyledChip
          label='dead'
          clickable
          onClick={() => setStatus('dead')}
          color={getColor(status, 'dead')}
          variant={getVariant(status, 'dead')}
        />
        <StyledChip
          label='unknown'
          clickable
          onClick={() => setStatus('unknown')}
          color={getColor(status, 'unknown')}
          variant={getVariant(status, 'unknown')}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip
          label='male'
          clickable
          onClick={() => setGender('male')}
          color={getColor(gender, 'male')}
          variant={getVariant(gender, 'male')}
        />
        <StyledChip
          label='female'
          clickable
          onClick={() => setGender('female')}
          color={getColor(gender, 'female')}
          variant={getVariant(gender, 'female')}
        />
        <StyledChip
          label='unknown'
          clickable
          onClick={() => setGender('unknown')}
          color={getColor(gender, 'unknown')}
          variant={getVariant(gender, 'unknown')}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip variant='outlined' label='clear filters' onDelete={() => clearFilters()} />
      </Filters>
    </Flex>
  )
}

export default CharacterFilters
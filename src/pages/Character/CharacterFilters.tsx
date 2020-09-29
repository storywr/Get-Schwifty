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
  species: string
  setSpecies: (species: string) => void
  status: string
  setStatus: (status: string) => void
  gender: string
  setGender: (gender: string) => void
  clearFilters: () => void
  resetPage: () => void
}

const CharacterFilters = ({
  species,
  setSpecies,
  status,
  setStatus,
  gender,
  setGender,
  clearFilters,
  resetPage
}: Props) => {
  return (
    <Flex>
      <Filters>
        <Filter
          currentAttribute={species}
          setAttribute={setSpecies}
          label='human'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={species}
          setAttribute={setSpecies}
          label='alien'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={species}
          setAttribute={setSpecies}
          label='humanoid'
          resetPage={resetPage}
        />
        <StyledDivider orientation="vertical" flexItem />
        <Filter
          currentAttribute={status}
          setAttribute={setStatus}
          label='alive'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={status}
          setAttribute={setStatus}
          label='dead'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={status}
          setAttribute={setStatus}
          label='unknown'
          resetPage={resetPage}
        />
        <StyledDivider orientation="vertical" flexItem />
        <Filter
          currentAttribute={gender}
          setAttribute={setGender}
          label='male'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={gender}
          setAttribute={setGender}
          label='female'
          resetPage={resetPage}
        />
        <Filter
          currentAttribute={gender}
          setAttribute={setGender}
          label='unknown'
          resetPage={resetPage}
        />
        <StyledDivider orientation="vertical" flexItem />
        <StyledChip variant='outlined' label='clear filters' onDelete={() => clearFilters()} />
      </Filters>
    </Flex>
  )
}

export default CharacterFilters
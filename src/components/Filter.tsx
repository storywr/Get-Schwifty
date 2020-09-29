import React from 'react'
import styled from 'styled-components'

import Chip from '@material-ui/core/Chip'

const getColor = (filter: string, attribute: string) => filter === attribute ? 'secondary' : 'default'
const getVariant = (filter: string, attribute: string) => filter === attribute ? 'default' : 'outlined'

const StyledChip = styled(Chip)`
  margin: 0.5rem;
`

interface Props {
  currentAttribute: string
  setAttribute: (attribute: string) => void
  label: string
  resetPage: () => void
}

const Filter = ({ currentAttribute, setAttribute, label, resetPage }: Props) => (
  <StyledChip
    label={label}
    clickable
    onClick={() => {
      resetPage()
      setAttribute(label)
    }}
    color={getColor(currentAttribute, label)}
    variant={getVariant(currentAttribute, label)}
  />
)

export default Filter
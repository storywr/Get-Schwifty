import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch';

import PeopleIcon from '@material-ui/icons/People'
import ListIcon from '@material-ui/icons/List'
import ExploreIcon from '@material-ui/icons/Explore'

export const mainListItems = (history: any) => (
  <>
    <ListItem
      button
      onClick={() => history.push('/character')}
    >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Character" />
    </ListItem>
    <ListItem
      button
      onClick={() => history.push('/location')}
    >
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Location" />
    </ListItem>
    <ListItem
      button
      onClick={() => history.push('/episode')}
    >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Episode" />
    </ListItem>
  </>
)

interface Props {
  dark: boolean
  setDark: (dark: boolean) => void
}

export const secondaryListItems = ({ dark, setDark }: Props) => (
  <>
    <ListItem
      button
      onClick={() => setDark(!dark)}
    >
      <ListItemIcon>
        <Switch
          checked={dark}
        />
      </ListItemIcon>
      <ListItemText primary="Night Mode" />
    </ListItem>
  </>
)
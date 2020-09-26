import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'
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

export const secondaryItems = (
  <>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Day Mode" />
    </ListItem>
  </>
)
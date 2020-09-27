import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import clsx from 'clsx'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import GitHubIcon from '@material-ui/icons/GitHub'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { mainListItems, secondaryListItems } from './DrawerItems'

import CharacterList from '../Character/CharacterList'
import CharacterDetails from '../Character/CharacterDetails'
import EpisodeList from '../Episode/EpisodeList'
import EpisodeDetails from '../Episode/EpisodeDetails'
import Home from '../Home'
import LocationList from '../Location/LocationList'
import LocationDetails from '../Location/LocationDetails'

const AppBarSpacer = styled.div`
  flex-grow: 1;
`

const Wrapper = styled.div`
  cursor: pointer;
`

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

interface Props {
  dark: boolean
  setDark: (dark: boolean) => void
}

const Dashboard = (props: Props) => {
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Wrapper>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
              onClick={() => history.push('/')}
            >
              Rick and Morty
            </Typography>
          </Wrapper>
          <AppBarSpacer />
          <a target='blank' href='https://github.com/storywr/r-m'>
          <IconButton
          >
            <GitHubIcon />
          </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems(history)}</List>
        <Divider />
        <List>{secondaryListItems(props)}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/character' component={CharacterList} />
            <Route path='/character/:id' component={CharacterDetails} />
            <Route exact path='/episode' component={EpisodeList} />
            <Route path='/episode/:id' component={EpisodeDetails} />
            <Route exact path='/location' component={LocationList} />
            <Route path='/location/:id' component={LocationDetails} />
            <Redirect to='/' />
          </Switch>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard

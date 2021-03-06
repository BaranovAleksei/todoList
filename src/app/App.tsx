import React, {useCallback, useEffect} from 'react'
import '../App.css'
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearDeterminate from "../common/LinearProgressCast";
import {useDispatch, useSelector} from "react-redux";
import { AppRootStateType } from "./store"
import {initializeAppTC, StatusType,} from "./app-reducer"
import { ErrorSnackbar } from "../common/ErrorSnackbar"
import { Login } from "../features/Login/Login"
import { BrowserRouter, Route } from 'react-router-dom'
import {logoutTC} from "../features/Login/auth-reducer"

function App() {

    const status = useSelector<AppRootStateType, StatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect( () => {
      dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
      dispatch(logoutTC())
    }, [])

    if(!isInitialized) {
      return <div
        style = {{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
      </div>
    }

    return  <BrowserRouter>
      <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>
            { isLoggedIn && <Button color="inherit" onClick={ logoutHandler }>Log out</Button>}
          </Toolbar>
          { status === 'loading' && <LinearProgress/> }
        </AppBar>
        <Container fixed>
          <Route exact path={"/"} render = {() => <TodolistsList />}/>
          <Route path = {"/login"} render = {() => <Login/>}/>
          <Route path = {"/404"} render = {() => <h1>404: PAGE NOT FOUND</h1>}/>
        </Container>
      </div>
    </BrowserRouter>
}

export default App

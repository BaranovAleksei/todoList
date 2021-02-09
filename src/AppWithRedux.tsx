import React, {useReducer} from "react";
import  './App.css'
import { Todolist, TaskType } from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"

import {  AddTodolistAC,
          ChangeTodolistAC,
          ChangeTodolistFilterAC,
          RemoveTodolistAC } from "./state/todoList-reducer"

import {  addTaskAC, changeTaskStatusAC,
          changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todolists )
  const tasks = useSelector<AppRootStateType, TaskStateType>( state => state.tasks)
  const dispatch = useDispatch()

  //tasks-reducer
  function removeTask(taskId: string, todoListID: string) {
    dispatch( removeTaskAC(taskId, todoListID))
  }

  function addTask(taskTitle: string, todoListID: string) {
    dispatch(addTaskAC(taskTitle, todoListID))
  }

  function changeStatus (taskID: string, isDone: boolean, todoListID: string) {
    dispatch(changeTaskStatusAC (taskID, isDone, todoListID))
  }

  function changeTaskTitle (taskID: string, title: string, todoListID: string) {
    dispatch(changeTaskTitleAC ( taskID, title, todoListID))
  }

  //todolist-reducer
  function changeFilter(value: FilterValueType, todoListID: string) {
    dispatch ( ChangeTodolistFilterAC ( todoListID, value))
  }

  function removeTodoList (todoListID: string) {
    dispatch(RemoveTodolistAC (todoListID))
  }

  function addTodoList (title: string) {
    dispatch(AddTodolistAC(title))
  }

  function changeTodoListTitle (todoListID: string, title: string) {
    dispatch( ChangeTodolistAC (todoListID, title) )
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" >
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed className='allTasks'>
        <Grid container >
          <AddItemForm addItem = { addTodoList } />
        </Grid>
        <Grid container spacing={4} >
          {todoLists.map( tl => {
              let tasksForTodoList = tasks[tl.id];

              if (tl.filter === "active") {
                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true);
              }

              return (
                <Grid item >
                  <Todolist
                    id = { tl.id }
                    key = { tl.id }
                    title = { tl.title }
                    filter={ tl.filter }
                    addTask = { addTask }
                    removeTask = { removeTask }
                    tasks = { tasksForTodoList }
                    changeFilter = { changeFilter }
                    changeStatus = { changeStatus }
                    changeTaskTitle = { changeTaskTitle }
                    removeTodoList = { removeTodoList }
                    changeTodoListTitle = { changeTodoListTitle }
                />
                </Grid>
              );
            })}
        </Grid>
      </Container>

    </div>
  );
}

export default AppWithRedux;
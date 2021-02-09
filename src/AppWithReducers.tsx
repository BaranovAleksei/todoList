import React, {useReducer} from "react";
import { v1 } from "uuid";
import { Todolist, TaskType } from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"

import {  AddTodolistAC,
          ChangeTodolistAC,
          ChangeTodolistFilterAC,
          RemoveTodolistAC,
          todoListReducer} from "./state/todoList-reducer"

import {  addTaskAC, changeTaskStatusAC,
          changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {

  const todoListID1 = v1();
  const todoListID2 = v1();

  const [todoLists, dispatchToTodolist] = useReducer(todoListReducer ,[
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'}
  ])

  const[tasks, dispatchToTasks ] = useReducer(tasksReducer, {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true },
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "RoR", isDone: false},
      {id: v1(), title: "Pyton", isDone: true}
    ],
    [todoListID2]: [
      {id: v1(), title: "Milk", isDone: true },
      {id: v1(), title: "Beer", isDone: true},
      {id: v1(), title: "Fish", isDone: false},
      {id: v1(), title: "Apple", isDone: false},
    ]
  })
  //tasks-reducer
  function removeTask(taskId: string, todoListID: string) {
    dispatchToTasks( removeTaskAC(taskId, todoListID))
  }

  function addTask(taskTitle: string, todoListID: string) {
    dispatchToTasks(addTaskAC(taskTitle, todoListID))
  }

  function changeStatus (taskID: string, isDone: boolean, todoListID: string) {
    dispatchToTasks(changeTaskStatusAC (taskID, isDone, todoListID))
  }

  function changeTaskTitle (taskID: string, title: string, todoListID: string) {
    dispatchToTasks(changeTaskTitleAC ( taskID, title, todoListID))
  }

  //todolist-reducer

  function changeFilter(value: FilterValueType, todoListID: string) {
    dispatchToTodolist ( ChangeTodolistFilterAC ( todoListID, value))
  }

  function removeTodoList (todoListID: string) {
    const action = RemoveTodolistAC (todoListID)
    dispatchToTasks(action)
    dispatchToTodolist(action)
  }

  function addTodoList (title: string) {
    const action = AddTodolistAC(title)
    dispatchToTasks(action)
    dispatchToTodolist(action)
  }

  function changeTodoListTitle (todoListID: string, title: string) {
    const action = ChangeTodolistAC (todoListID, title)
    dispatchToTodolist( action )
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

      <Container fixed>
        <Grid container >
          <AddItemForm addItem = { addTodoList } />
        </Grid>
        <Grid container spacing={4}>
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

export default AppWithReducers;
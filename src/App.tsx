import React, { useState } from "react";
import { v1 } from "uuid";
// import "./App.css";
import { Todolist, TaskType } from "./Todolist";
import {AddItemForm} from "./AddItemForm";

import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
  id: string
  title: string
  filter: FilterValueType
};
type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todoListID1 = v1();
  const todoListID2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'}
  ]);

  const[tasks, setTasks ] = useState<TaskStateType>( {
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
  });

  function addTask(taskTitle: string, todoListID: string) {
    const newTask: TaskType = { id: v1(), title: taskTitle, isDone: false };
    const  todoList = tasks[todoListID];
    tasks[todoListID] = [newTask, ...todoList];
    setTasks({...tasks});
  };

  function removeTask(taskId: string, todoListID: string) {
    const  todoList = tasks[todoListID];
    tasks[todoListID] = todoList.filter(t => t.id !== taskId);
    setTasks({...tasks});
  };

  function changeFilter(value: FilterValueType, todoListID: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID);
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  };

  function changeStatus (taskID: string, isDone: boolean, todoListID: string) {
    const  todoList = tasks[todoListID];
    const task = todoList.find(t => t.id === taskID);
    if ( task ) {
      task.isDone = isDone;
      setTasks({...tasks});
    }
  };

  // второй вариант функции changeStatus
  // function changeStatus (taskID: string, isDone: boolean, todoListID: string) {
  //   const  todoList = tasks[todoListID];
  //   const newTodoList = todoList.map(task => {
  //   if(task.id === taskID) {
  //      return { ...task, isDone: isDone }
  //     }
  //   return task
  //   })
  //   setTasks(...task)
  // }

  function changeTaskTitle (taskID: string, title: string, todoListID: string) {
    const  todoList = tasks[todoListID];
    const task = todoList.find(t => t.id === taskID);
    if ( task ) {
      task.title = title;
      setTasks({...tasks });
    }
  };

  function removeTodoList (todoListID: string) {
    setTodoLists(todoLists.filter( tl => tl.id !== todoListID));
    delete tasks[todoListID];
    setTasks({...tasks});
  };

  function addTodoList (title: string) {
    const newTodoListID = v1();
    const newTodoList: TodoListType = {
      id: newTodoListID,
      title: title,
      filter: "all"
    };
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({
      ...tasks,
      [newTodoListID]: []
    })
  };

  function changeTodoListTitle (todoListID: string, title: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID);
    if (todoList) {
      todoList.title = title;
      setTodoLists([...todoLists]);
    }
  };

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

export default App;
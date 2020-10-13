import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { Todolist, TaskType } from "./Todolist";

export type FilterValueType = "all" | "active" | "completed";

function App() {
  const arraySet = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "RoR", isDone: false },
    { id: v1(), title: "Pyton", isDone: true },
  ]);

  const tasks = arraySet[0];

  const setTasks = arraySet[1];

  const [filter, setFilter] = useState<FilterValueType>("all");

  function addTask(taskTitle: string) {
    const newTask: TaskType = { id: v1(), title: taskTitle, isDone: false };
    setTasks([newTask, ...tasks]);
  }

  function removeTask(taskId: string) {
    const filteredTask = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTask);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  function changeStatus (taskID: string, isDone: boolean) {
    let task = tasks.find(task => task.id === taskID);
    if ( task ) {
      task.isDone = isDone;
      setTasks([...tasks]);
    }
  }
  // второй вариант функции changeStatus
  // function changeStatus (taskID: string, isDone: boolean) {
  //   let newTasks = tasks.map(task => {
  //     if(task.id === taskID){
  //       return {...task, isDone: isDone}
  //     }
  //     return task
  //   })
  //   setTasks(newTasks)
  // }


  let tasksForTodoList = tasks;

  if (filter === "active") {
    tasksForTodoList = tasks.filter((tasks) => tasks.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((tasks) => tasks.isDone === true);
  }

  return (
    <div className="App">
      <Todolist
        title = { "What to learn" }
        tasks = { tasksForTodoList }
        filter={ filter }
        addTask = { addTask }
        removeTask = { removeTask }
        changeFilter = { changeFilter }
        changeStatus = { changeStatus }
      />
    </div>
  );
}

export default App;

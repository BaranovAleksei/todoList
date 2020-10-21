import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValueType;
  addTask: (taskTitle: string, todoListID: string) => void;
  removeTask: (taskId: string, todoListID: string ) => void;
  changeFilter: (value: FilterValueType, todoListID: string) => void;
  changeStatus: (taskID: string, isDone: boolean,todoListID: string) => void;
  changeTaskTitle: (taskID: string, title: string,todoListID: string) => void
  removeTodoList: (todoListID: string) => void;
  changeTodoListTitle: (todoListID: string, title: string) => void;
};

export function Todolist(props: PropsType) {

  const tasks = props.tasks.map((t) => {

    const removeTask = () => {
      props.removeTask(t.id, props.id);
    };

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(t.id, e.currentTarget.checked, props.id);
    };

    const changeTitle = (title: string) => {
      props.changeTaskTitle(t.id, title, props.id);
    }

    return (
      <li key={t.id}>
        <input type="checkbox"
               checked={t.isDone}
               onChange={changeStatus}
        />
        {/*<span className={t.isDone ? "is-done" : ""}>{t.title}</span>*/}
        <EditableSpan title={t.title} changeTitle={ changeTitle } />
        <button onClick={removeTask}>Del</button>
      </li>
    );
  });

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const removeTodoList = () => { props.removeTodoList(props.id) };

  const onSetAllFilterClick = () => {
    props.changeFilter("all", props.id);
  };
  const onSetActiveFilterClick = () => {
    props.changeFilter("active", props.id);
  };
  const onSetComplitedFilterClick = () => {
    props.changeFilter("completed", props.id);
  };

  const changeTodoListTitle = (title: string) => { props.changeTodoListTitle(props.id, title)}

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={ changeTodoListTitle }/>
        <button onClick ={ removeTodoList }>X</button>
      </h3>

      <AddItemForm addItem = { addTask }/>
      <ul>{tasks}</ul>
      <div>
        <button
          className={props.filter === "all" ? "active" : ""}
          onClick={onSetAllFilterClick}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active" : ""}
          onClick={onSetActiveFilterClick}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active" : ""}
          onClick={onSetComplitedFilterClick}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

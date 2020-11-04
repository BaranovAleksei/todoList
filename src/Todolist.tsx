import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {CheckBox, Delete} from "@material-ui/icons";
import { IconButton, Button, Checkbox } from "@material-ui/core";

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
        <Checkbox
          onChange={changeStatus}
          checked={t.isDone}
          color ={'primary'}
        />
        <EditableSpan title={t.title} changeTitle={ changeTitle } />
        <Button onClick={removeTask}
                color ={'primary'}>
          <Delete/>
        </Button>
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
        {/*<button onClick ={ removeTodoList }>X</button>*/}
        <IconButton onClick ={ removeTodoList }>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem = { addTask }/>
      <ul style = {{listStyle: 'none', padding: '0'}}>{tasks}</ul>
      <div>
        <Button
          // className={props.filter === "all" ? "active" : ""}
          onClick={onSetAllFilterClick}
          variant={props.filter === "all"  ? 'contained':'text'}
          size={'small'}
          color={'primary'}
          style={{margin: '5px'}}
        >
          All
        </Button>
        <Button
          // className={props.filter === "active" ? "active" : ""}
          onClick={onSetActiveFilterClick}
          size={'small'}
          variant={props.filter === "active"  ? 'contained':'text'}
          color={'primary'}
          style={{margin: '5px'}}
        >
          Active
        </Button>
        <Button
          // className={props.filter === "completed" ? "active" : ""}
          onClick={onSetComplitedFilterClick}
          variant={props.filter === "completed" ? 'contained':'text' }
          size={'small'}
          color={'primary'}
          style={{margin: '5px'}}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}

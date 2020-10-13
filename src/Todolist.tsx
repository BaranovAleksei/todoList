import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "./App";

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
  removeTodoList: (todoListID: string) => void;
};

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const tasks = props.tasks.map((t) => {
    const removeTask = () => {
      props.removeTask(t.id, props.id);
    };

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(t.id, e.currentTarget.checked, props.id);
    };

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={changeStatus} />
        <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
        <button onClick={removeTask}>Del</button>
      </li>
    );
  });

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim(), props.id);
      setTitle("");
    } else {
      setError("Title is required!");
    }
  };

  const onChengeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onAddTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
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

  return (
    <div>
      <h3>{props.title}<button onClick ={ removeTodoList }>X</button></h3>
      <div>
        <input
          value={title}
          onChange={onChengeTitle}
          onKeyPress={onAddTaskKeyPress}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}> {error} </div>}
      </div>
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

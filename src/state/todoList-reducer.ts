import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}
export type ChangeTodolistActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValueType
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType
  | ChangeTodolistActionType | ChangeTodolistFilterActionType

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType):Array<TodoListType> => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return state.filter( tl => tl.id !== action.id);

    case 'ADD-TODOLIST':
      return [...state, {id: action.todolistId, title: action.title, filter: "all"}]

    case 'CHANGE-TODOLIST-TITLE': {
      const todoList = state.find(tl => tl.id === action.id)
      if (todoList) {

        todoList.title = action.title;
        return [...state]
      }
      return [...state];
    }

    case 'CHANGE-TODOLIST-FILTER': {

      const todoList = state.find(tl => tl.id === action.id)
      if (todoList) {
        todoList.filter = action.filter
        return [...state]
      }
      return [...state]
    }
    default:
      return state
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (todolistTitle: string ): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: todolistTitle, todolistId: v1() }
}
export const ChangeTodolistAC = (todolistId: string, todolistTitle: string): ChangeTodolistActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE' , id: todolistId , title: todolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, todolistFilter: FilterValueType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: todolistFilter}
}
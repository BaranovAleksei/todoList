import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType | ChangeTodolistFilterActionType ;


export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
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

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return state.filter( tl => tl.id !== action.id);

    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: v1(),
        title: action.title,
        filter: "all"
      }
      return [...state, newTodoList];

    case 'CHANGE-TODOLIST-TITLE': {
      const todoList = state.find(tl => tl.id === action.id)
      if (todoList) {

        todoList.title = action.title;
        return [...state]
      }
      return [...state];
    };

    case 'CHANGE-TODOLIST-FILTER': {

      const todoList = state.find(tl => tl.id === action.id)
      if (todoList) {
        todoList.filter = action.filter
        return [...state]
      }
      return [...state]
    }

    default:
      throw new Error( ' Whot you say? ....')
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const AddTodolistAC = (todolistTitle: string ): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: todolistTitle}
}
export const ChangeTodolistAC = (todolistId: string, todolistTitle: string): ChangeTodolistActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE' , id: todolistId , title: todolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, todolistFilter: FilterValueType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: todolistFilter}
}
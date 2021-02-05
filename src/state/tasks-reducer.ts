import {TaskStateType} from '../App'
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from './todoList-reducer';

export enum ACTIONS_TYPE {
	REMOVE_TASK='REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
	CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
}
export type removeTaskType = {
	type: ACTIONS_TYPE.REMOVE_TASK
	payload: {
		id: string
		todolistId: string
	}
}
export const removeTaskAC = (id: string, todolistId: string): removeTaskType => {
	return {
		type: ACTIONS_TYPE.REMOVE_TASK,
		payload: { id , todolistId }
	}
}
export type addTaskType = {
	type: ACTIONS_TYPE.ADD_TASK
	payload: {
		taskTitle: string,
		todoListID: string
	}
}
export const addTaskAC = ( taskTitle: string, todoListID: string): addTaskType => {
	return {
		type: ACTIONS_TYPE.ADD_TASK,
		payload: { taskTitle, todoListID }
	}
}
export type changeTaskStatusType = {
	type: ACTIONS_TYPE.CHANGE_TASK_STATUS
	payload: {
		taskID: string
		isDone: boolean
		todoListID: string
	}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): changeTaskStatusType => {
	return {
		type: ACTIONS_TYPE.CHANGE_TASK_STATUS,
		payload: {taskID, isDone, todoListID }
	}
}

type changeTaskTitleType = {
	type: ACTIONS_TYPE.CHANGE_TASK_TITLE
	payload: {
		taskID: string
		title: string
		todoListID: string
	}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string):changeTaskTitleType => {
	return {
		type: ACTIONS_TYPE.CHANGE_TASK_TITLE,
		payload: {taskID, title, todoListID}
	}
}

type ActionType = removeTaskType | addTaskType
	| changeTaskStatusType | changeTaskTitleType
	| AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = ( state: TaskStateType, action: ActionType): TaskStateType => {
	switch (action.type){

		case ACTIONS_TYPE.REMOVE_TASK: {
			// const stateCopy = {...state}
			// const tasks = state[action.payload.todolistId]
			// const filteredTasks = tasks.filter( t => t.id !== action.payload.id )
			// stateCopy[action.payload.todolistId] = filteredTasks
			// return stateCopy
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
					.filter(task => task.id !== action.payload.id)}
		}
		case ACTIONS_TYPE.ADD_TASK: {
			const stateCopy = {...state}
			const tasks = stateCopy[action.payload.todoListID]
			const newTask: TaskType = { id: v1(), title: action.payload.taskTitle, isDone: false }
			stateCopy[action.payload.todoListID] = [newTask, ...tasks]
			return stateCopy
		}
		case ACTIONS_TYPE.CHANGE_TASK_STATUS: {
			const stateCopy = {...state}
			const tasks = stateCopy[action.payload.todoListID]

			// найдём нужную таску:
			let task = tasks.find(t => t.id === action.payload.taskID);
			//изменим таску, если она нашлась
			if (task) {
				task.isDone = action.payload.isDone;
			}
			return stateCopy;
		}
		case ACTIONS_TYPE.CHANGE_TASK_TITLE: {
			const stateCopy = {...state}
			const tasks = stateCopy[action.payload.todoListID]
			const task = tasks.find( t => t.id === action.payload.taskID)
			if (task) {
				task.title = action.payload.title
			}
			return stateCopy
		}
		case 'ADD-TODOLIST' : {
			const stateCopy = {...state};
			stateCopy[action.todolistId] = [];
			return stateCopy;
		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = {...state};
			delete stateCopy[action.id]
			return stateCopy;
		}
		default: {
			return {...state}
		}
	}
}
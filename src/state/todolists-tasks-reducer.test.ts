import {TaskStateType, TodoListType} from "../App"
import {AddTodolistAC, todoListReducer} from "./todoList-reducer"
import {tasksReducer} from "./tasks-reducer"


test('ids should be equals', () => {
	const startTasksState: TaskStateType = {};
	const startTodolistState: Array<TodoListType> = [];

	const action = AddTodolistAC("new todolist");

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistState = todoListReducer(startTodolistState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistState[0].id

	expect(idFromTasks).toBe(action.todolistId)
	expect(idFromTodolists).toBe(action.todolistId)
})
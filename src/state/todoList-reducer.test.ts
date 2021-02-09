import {
  AddTodolistAC,
  ChangeTodolistAC,
  ChangeTodolistFilterAC,
  RemoveTodolistAC,
  todoListReducer
} from './todoList-reducer';
import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../App';

let startState: Array<TodoListType> = []
let todolistId1: string = v1();
let todolistId2: string = v1();

beforeEach( ()=> {
  startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
})

test('correct todolist should be removed', () => {

  const endState = todoListReducer(startState, RemoveTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

  let newTodolistTitle = "New Todolist";

  const endState = todoListReducer(startState, AddTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

  let newTodolistTitle = "New Todolist"

  const endState = todoListReducer(startState, ChangeTodolistAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

  let newFilter: FilterValueType = "completed"

  const endState = todoListReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
})





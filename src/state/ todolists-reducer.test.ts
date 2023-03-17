import {
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle, FilterValuesType,
    RemoveTodolist, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v4} from 'uuid';

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType> = []

beforeEach(() => {

    todolistId1 = v4();
    todolistId2 = v4();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, AddTodolist('New todolist'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New todolist');
});

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolist(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTodolistTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, ChangeTodolistFilter(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


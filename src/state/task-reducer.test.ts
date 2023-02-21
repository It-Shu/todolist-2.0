import {TasksStateType} from '../App';
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from "./task-reducer";
import {addTodolist, removeTodolist} from "./todolists-reducer";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

afterEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTask("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTask("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].isDone).toBe(false);

});

test('status of specified task should be changed', () => {

    const action = changeTaskStatus("1", true, "todolistId2");

    const endState = tasksReducer(startState, action)

    const res = endState["todolistId2"].filter(e => {
        return e.id == "1"
    })

    // "todolistId2": [
    //     {id: "1", title: "bread", isDone: false},
    //     {id: "2", title: "milk", isDone: false},
    //     {id: "3", title: "tea", isDone: false}
    // ]
    //     {id: "1", title: "tea", isDone: false},
    //     {id: "2", title: "bread", isDone: true},
    //     {id: "3", title: "milk", isDone: false}

    expect(res[0].isDone).toBe(true);
    expect(endState['todolistId2'][0].title).toBe('milk');
    expect(endState['todolistId2'][1].title).toBe('tea');
    expect(endState['todolistId2'][2].title).toBe('bread');

    expect(endState['todolistId2'][0].id).toBe('2');
    expect(endState['todolistId2'][1].id).toBe('3');
    expect(endState['todolistId2'][2].id).toBe('1');
});

test('task title should be changed', () => {
    const action = changeTaskTitle("1", 'corn bread', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('corn bread');
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolist("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolist("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

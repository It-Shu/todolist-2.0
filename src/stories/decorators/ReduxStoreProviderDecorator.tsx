import {AppRootStateType, store} from "../../state/store/store";
import {Provider} from "react-redux";
import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/task-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {v4} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true}
        ]
    }

}

export const StoryBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={StoryBookStore}>{storyFn()}</Provider>
}

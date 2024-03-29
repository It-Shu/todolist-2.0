import React, {useEffect, useState} from 'react'
import {taskAPI, TaskPriorities, TaskStatuses} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cb3b32f1-4d02-4bc3-8db6-f1d5db28c842'
        taskAPI.GetTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cb3b32f1-4d02-4bc3-8db6-f1d5db28c842'
        taskAPI.CreateNewTask(todolistId,'KJHAKJBAJIB')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cb3b32f1-4d02-4bc3-8db6-f1d5db28c842';
        const taskId = '970c8f61-b193-4d0c-992b-44afbcd1dbfa';
        taskAPI.DeleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'cb3b32f1-4d02-4bc3-8db6-f1d5db28c842';
        const taskId = '970c8f61-b193-4d0c-992b-44afbcd1dbfa';
        const modal = {
            title: '111111111111',
            description: '',
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
        }
        taskAPI.UpdateTask(todolistId, taskId, modal)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

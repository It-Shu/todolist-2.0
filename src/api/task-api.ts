import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '8137754c-18be-4205-a310-a8fa66fda953'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

type TaskResponseType = {
    description: string | null
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline?: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponseType = {
    items: Array<TaskResponseType>
    totalCount: number
    error: string | null
}

type ResponseTaskType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export const taskAPI = {
    GetTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    CreateNewTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{ item: Array<TaskResponseType> }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    DeleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    UpdateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseTaskType<{ item: Array<TaskResponseType> }>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}

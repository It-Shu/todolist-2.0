import axios, {AxiosResponse} from "axios";

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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type TaskResponseType = {
    description: string | null
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline?: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTaskResponseType = {
    items: Array<TaskResponseType>
    totalCount: number
    error: string | null
}

type ResponseTaskType<T = {}> = {
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
        return instance.post<{title: string}, AxiosResponse<ResponseTaskType<{ item: TaskResponseType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    DeleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    UpdateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseTaskType<{ item: TaskResponseType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, {model})
    }
}

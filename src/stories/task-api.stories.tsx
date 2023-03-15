import React, {useEffect, useState} from 'react'
// import axios from "axios";
// import {todolistAPI} from "../api/todolist-api";
//
// export default {
//     title: 'API'
// }
//
// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         taskAPI.GetTodolists()
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         taskAPI.CreateTodolist('AAAAAAAAAAAAAAAAAAAAA')
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todolistId = '';
//         taskAPI.DeleteTodolist(todolistId)
//             .then((res) => {
//                 setState(res.data);
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = 'cb3b32f1-4d02-4bc3-8db6-f1d5db28c842';
//         taskAPI.UpdateTodolist(todolistId, 'XXXXXX')
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }

import axios from 'axios'

const url:string = 'https://jsonplaceholder.typicode.com/'
export async function getPost(id:number) {
    const response = await axios.get<Post>(url+`posts/${id}`)
    return response.data
}

export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

export async function getUsers(id?:number) {
    const response = await axios.get<User>(url+'users')
    return response.data
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {}
}
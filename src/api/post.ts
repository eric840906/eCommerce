import axios from 'axios'
const post = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/post`
})
export const getPosts = (page: number, limit: number, category = 'default') => post.request({
  url: `${category !== 'default' ? `?category=${category}&page=${page}&limit=${limit}` : `?page=${page}&limit=${limit}`}`,
  method: 'GET',
  withCredentials: true
})
export const getPost = (id: string) => post.request({
  url: `/${id}`,
  method: 'GET',
  withCredentials: true
})
export const getPostStats = () => post.request({
  url: '/stats',
  method: 'GET',
  withCredentials: true
})

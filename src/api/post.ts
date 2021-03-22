import axios from 'axios'
import { Post } from '@/views/Dashboard/Post.vue'
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
export const createPost = (data: Post) => post.request({
  url: '',
  method: 'POST',
  withCredentials: true,
  data
})
export const updatePost = (id: string, data: Post) => post.request({
  url: `/${id}`,
  method: 'PATCH',
  withCredentials: true,
  data
})

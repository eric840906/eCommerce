import axios from 'axios'
const post = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/post`
})
export const getPosts = (page: number, limit = 5) => post.request({
  url: `/?page=${page}&limit=${limit}`,
  method: 'GET',
  withCredentials: true
})

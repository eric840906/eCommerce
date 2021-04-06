import axios from 'axios'
import bus from '@/plugins/bus'
const post = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/postcomment`
})
export const sendPostComment = (id: string, comment: string) => post.request({
  url: `/${id}`,
  method: 'POST',
  withCredentials: true,
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    if (percentCompleted < 100) {
      bus.emit('progress', percentCompleted)
    } else if (percentCompleted === 100) {
      bus.emit('image-complete', 0)
    }
    // do whatever you like with the percentage complete
    // maybe dispatch an action that will update a progress bar or something
  },
  data: {
    comment
  }
})
export const getPostComment = (id: string, page: number) => post.request({
  url: `/?post=${id}&sort=-createdAt&page=${page}&limit=5`,
  method: 'GET',
  withCredentials: true,
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    if (percentCompleted < 100) {
      bus.emit('progress', percentCompleted)
    } else if (percentCompleted === 100) {
      bus.emit('image-complete', 0)
    }
    // do whatever you like with the percentage complete
    // maybe dispatch an action that will update a progress bar or something
  }
})

export const deletePostComment = (id: string) => post.request({
  url: `/${id}`,
  method: 'DELETE',
  withCredentials: true,
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    if (percentCompleted < 100) {
      bus.emit('progress', percentCompleted)
    } else if (percentCompleted === 100) {
      bus.emit('image-complete', 0)
    }
    // do whatever you like with the percentage complete
    // maybe dispatch an action that will update a progress bar or something
  }
})

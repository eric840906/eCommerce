import axios from 'axios'
import bus from '@/plugins/bus'
const post = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/review`
})
export interface ReviewData {
  review: string;
  rating: number;
  product: string;
}
export const sendReview = (data: ReviewData) => post.request({
  url: '',
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
  data
})
// export const getReview = (id: string, page: number) => post.request({
//   url: `/?post=${id}&sort=-createdAt&page=${page}&limit=5`,
//   method: 'GET',
//   withCredentials: true,
//   onUploadProgress: progressEvent => {
//     const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
//     if (percentCompleted < 100) {
//       bus.emit('progress', percentCompleted)
//     } else if (percentCompleted === 100) {
//       bus.emit('image-complete', 0)
//     }
//     // do whatever you like with the percentage complete
//     // maybe dispatch an action that will update a progress bar or something
//   }
// })
export const searchReview = (id: string, page: number) => post.request({
  url: `/?product=${id}&sort=-createdAt&page=${page}&limit=5`,
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
export const removeReview = (id: string) => post.request({
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

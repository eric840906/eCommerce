import axios from 'axios'
import bus from '@/plugins/bus'
export interface CartProduct {
  product: string;
  quantity: number;
}
const cart = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/user/cart`
})
export const addCart = (data: CartProduct) => cart.request({
  url: '',
  method: 'POST',
  withCredentials: true,
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    console.log(percentCompleted)
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
export const removeCartItem = (product: object) => cart.request({
  url: '',
  method: 'DELETE',
  withCredentials: true,
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    console.log(percentCompleted)
    if (percentCompleted < 100) {
      bus.emit('progress', percentCompleted)
    } else if (percentCompleted === 100) {
      bus.emit('image-complete', 0)
    }
    // do whatever you like with the percentage complete
    // maybe dispatch an action that will update a progress bar or something
  },
  data: product
})

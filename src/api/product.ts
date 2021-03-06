import axios from 'axios'
import bus from '@/plugins/bus'
export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  quantity: number;
  description: string;
  images: string[];
  category: string;
  finalPrice?: number;
}
export interface UploadProduct {
  name: string;
  price: number;
  discountPrice: number;
  category: string;
  quantity: number;
  description: string;
  images: string[];
}
const product = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/product`
})
export const uploadProduct = (data: UploadProduct) => product.request({
  url: '',
  method: 'POST',
  withCredentials: true,
  data
})
export const updateProduct = (data: UploadProduct, id: string) => product.request({
  url: `/${id}`,
  method: 'PATCH',
  withCredentials: true,
  data
})
export const removeProduct = (id: string) => product.request({
  url: `/${id}`,
  method: 'DELETE',
  withCredentials: true
})
export const getProducts = (category: string, page: number, filterString = '') => product.request({
  url: `${category === 'default' ? `?&${filterString}&page=${page}&limit=9` : `?&category=${category}&${filterString}&page=${page}&limit=9`}`,
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
export const getProduct = (id: string) => product.request({
  url: `/${id}`,
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
export const getProductStat = () => product.request({
  url: '/stats',
  method: 'GET',
  withCredentials: true
})

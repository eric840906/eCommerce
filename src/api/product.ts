import axios from 'axios'
export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice: number;
  quantity: number;
  description: string;
  images: string[];
  category: string;
}
const product = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/product`
})
export const getProducts = (category: string, page: number, filterString = '') => product.request({
  url: `${category === 'default' ? `?&${filterString}&page=${page}&limit=9` : `?&category=${category}&${filterString}&page=1&limit=9`}`,
  method: 'GET',
  withCredentials: true
})
export const getProductStat = () => product.request({
  url: '/stats',
  method: 'GET',
  withCredentials: true
})

import axios from 'axios'
import { UserInfo } from '@/store/index'
const user = axios.create({
  // baseURL: `${process.env.VUE_APP_APIPATH}`,
  baseURL: 'http://127.0.0.1:8000/api/user'
})
export const signUp = (nameInput: string, emailInput: string, passwordInput: string, passwordConfirmInput: string) => user.request({
  url: '/signup',
  method: 'POST',
  withCredentials: true,
  data: {
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    passwordConfirm: passwordConfirmInput
  }
})
export const logIn = (data: UserInfo) => user.request({
  url: '/login',
  method: 'POST',
  withCredentials: true,
  data
})
import axios from 'axios'
export const uploadImage = (image: FormData) => axios({
  url: 'https://api.imgur.com/3/image',
  method: 'POST',
  data: image,
  headers: {
    Authorization: 'Client-ID b3c0d5a76b76d4e'
  }
})

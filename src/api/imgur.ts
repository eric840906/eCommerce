import axios from 'axios'
export const uploadImage = (image: FormData) => axios({
  url: 'https://api.imgur.com/3/image',
  method: 'POST',
  data: image,
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
    console.log(percentCompleted)
    // do whatever you like with the percentage complete
    // maybe dispatch an action that will update a progress bar or something
  },
  headers: {
    Authorization: 'Client-ID b3c0d5a76b76d4e'
  }
})

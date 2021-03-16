import axios from 'axios'
import bus from '@/plugins/bus'
export const uploadImage = (image: FormData) => axios({
  url: 'https://api.imgur.com/3/image',
  method: 'POST',
  data: image,
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
  headers: {
    Authorization: `Client-ID ${process.env.VUE_APP_IMGUR_ID}`
  }
})

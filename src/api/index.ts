import { signUp, logIn, check, logOut, updateInfo, updatePassword } from './auth'
import { getPosts, getPost } from './post'
import { sendPostComment, deletePostComment } from './postComment'
import { uploadImage } from './imgur'
export const userSignup = signUp
export const userLogin = logIn
export const userCheck = check
export const userLogout = logOut
export const userUpdate = updateInfo
export const userPassUpdate = updatePassword
export const imageUpload = uploadImage
export const getContent = getPosts
export const getCurrent = getPost
export const postPostComment = sendPostComment
export const removePostComment = deletePostComment

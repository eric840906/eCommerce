import { signUp, logIn, check, logOut, updateInfo, updatePassword } from './auth'
import { getPosts, getPost, getPostStats, createPost, updatePost } from './post'
import { sendPostComment, deletePostComment, getPostComment } from './postComment'
import { getProducts, getProductStat, getProduct, uploadProduct, updateProduct, removeProduct } from './product'
import { sendReview, removeReview, searchReview } from './review'
import { addCart, removeCartItem } from './cart'
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
export const getMoreComment = getPostComment
export const getPostCount = getPostStats
export const postNewPost = createPost
export const patchPost = updatePost
export const getAllProduct = getProducts
export const getProductCount = getProductStat
export const getSingleProduct = getProduct
export const postProduct = uploadProduct
export const patchProduct = updateProduct
export const deleteProduct = removeProduct
export const postCart = addCart
export const deleteItem = removeCartItem
export const postReview = sendReview
export const deleteReview = removeReview
export const getReview = searchReview

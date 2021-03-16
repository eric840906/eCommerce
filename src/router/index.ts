import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useToast } from 'vue-toastification'
import { userCheck } from '@/api'
import Front from '../views/Front.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Front',
    component: Front,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/About.vue')
      },
      {
        path: '/gallery',
        name: 'Gallery',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/Gallery.vue')
      },
      {
        path: '/blog',
        name: 'Blog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/Blog.vue')
      },
      {
        path: '/recipe',
        name: 'Recipe',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/Recipe.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Account',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/Account.vue')
      },
      {
        path: '/userpost',
        name: 'Post',
        meta: {
          keepAlive: true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/Post.vue')
      },
      {
        path: '/userphoto',
        name: 'Photo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/Photo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const toast = useToast()
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const res = await userCheck()
      if (res.data.state === 'success') return next()
    } catch (error) {
      toast.error('Log in and try again')
      next({ name: 'Front' })
    }
  }
  next()
})
export default router

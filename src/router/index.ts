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
        component: () => import('../views/Front/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/Front/About.vue')
      },
      {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/Front/Gallery.vue')
      },
      {
        path: '/blog/:query',
        name: 'Blog',
        component: () => import('../views/Front/Blog.vue'),
        children: [
          {
            path: '',
            name: 'Postlist',
            component: () => import('../views/Front/Post/postList.vue')
          },
          {
            path: ':id',
            name: 'Postpage',
            component: () => import('../views/Front/Post/_id.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Account',
        component: () => import('../views/Dashboard/Account.vue')
      },
      {
        path: '/userpost',
        name: 'Post',
        meta: {
          keepAlive: true
        },
        component: () => import('../views/Dashboard/Post.vue')
      },
      {
        path: '/userphoto',
        name: 'Photo',
        component: () => import('../views/Dashboard/Photo.vue')
      },
      {
        path: '/update/:id',
        name: 'UpdatePost',
        component: () => import('../views/Dashboard/UpdatePost.vue')
      }

    ]
  },
  {
    path: '/shop/:query',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    children: [
      {
        path: '',
        name: 'ProductList',
        component: () => import('../views/Shop/productList.vue')
      },
      {
        path: '/:id',
        name: 'ProductPage',
        component: () => import('../views/Shop/_id.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to) {
    // always scroll 10px above the element #main
    if (to.name === 'Home') {
      return {
        // could also be
        // el: document.getElementById('main'),
        el: '#app',
        top: 0
      }
    }
    return {
      // could also be
      // el: document.getElementById('main'),
      el: '.page-view',
      top: 50
    }
  }
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

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
        path: '/blog/:query',
        name: 'Blog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/Blog.vue'),
        children: [
          {
            path: '',
            name: 'Postlist',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/Front/Post/postList.vue')
          },
          {
            path: ':id',
            name: 'Postpage',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/Front/Post/_id.vue')
          }
        ]
      },
      {
        path: '/shop',
        name: 'Shop',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Front/shop.vue')
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

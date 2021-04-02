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
        component: () => import('../views/Front/Home.vue' /* webpackChunkName: "Home" */)
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/Front/About.vue' /* webpackChunkName: "About" */)
      },
      {
        path: '/gallery',
        name: 'Gallery',
        component: () => import('../views/Front/Gallery.vue' /* webpackChunkName: "Gallery" */)
      },
      {
        path: '/blog/:query',
        name: 'Blog',
        component: () => import('../views/Front/Blog.vue' /* webpackChunkName: "Blog" */),
        children: [
          {
            path: '',
            name: 'Postlist',
            component: () => import('../views/Front/Post/postList.vue' /* webpackChunkName: "Postlist" */)
          },
          {
            path: ':id',
            name: 'Postpage',
            component: () => import('../views/Front/Post/_id.vue' /* webpackChunkName: "Postpage" */)
          }
        ]
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: () => import('../views/Dashboard.vue' /* webpackChunkName: "Dashboard" */),
    children: [
      {
        path: '/dashboard',
        name: 'Account',
        component: () => import('../views/Dashboard/Account.vue' /* webpackChunkName: "Account" */)
      },
      {
        path: '/userpost',
        name: 'Post',
        meta: {
          keepAlive: true
        },
        component: () => import('../views/Dashboard/Post.vue' /* webpackChunkName: "Post" */)
      },
      {
        path: '/product-control',
        name: 'ProductControl',
        component: () => import('../views/Dashboard/Product.vue' /* webpackChunkName: "ProductControl" */)
      },
      {
        path: '/update/:id',
        name: 'UpdatePost',
        component: () => import('../views/Dashboard/UpdatePost.vue' /* webpackChunkName: "UpdatePost" */)
      }

    ]
  },
  {
    path: '/shop/:query',
    name: 'Shop',
    component: () => import('../views/Shop.vue' /* webpackChunkName: "Shop" */),
    children: [
      {
        path: '',
        name: 'ProductList',
        component: () => import('../views/Shop/productList.vue' /* webpackChunkName: "ProductList" */)
      },
      {
        path: ':id',
        name: 'ProductPage',
        component: () => import('../views/Shop/_id.vue' /* webpackChunkName: "ProductPage" */)
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Shop/cart.vue' /* webpackChunkName: "Cart" */)
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
    } else if (document.getElementById('main')) {
      return {
        // could also be
        // el: document.getElementById('main'),
        el: '.page-view',
        top: 50
      }
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

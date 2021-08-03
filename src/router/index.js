import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {Notify} from "vant";

const home = () => import('../views/home/Home')
const category = () => import('../views/category/CateGory')
const cart = () => import('../views/cart/Cart')
const profile = () => import('../views/profile/Profile')
const register = () => import('../views/profile/register/Register')
const login = () => import('../views/profile/login/Login')
const detail = () => import('../views/detail/Detail')
const address = () => import('../views/profile/address/AddRess')
const newadd = () => import('../views/profile/address/newAdd')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
    meta: {
      title:'图书兄弟'
    }
  },
  {
    path:'/home',
    component: home,
    meta: {
      title:'图书兄弟'
    }
  },
  {
    path:'/category',
    component: category,
    meta: {
      title:'图书兄弟-分类'
    }
  },
  {
    path:'/cart',
    component: cart,
    meta: {
      title:'图书兄弟-购物车',
      isAuthRequired:true
    }
  },
  {
    path:'/profile',
    component: profile,
    meta: {
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    }
  },
  {
    path:'/register',
    component: register,
    meta: {
      title:'图书兄弟-用户注册'
    }
  },
  {
    path:'/login',
    component: login,
    meta: {
      title:'图书兄弟-用户登录'
    }
  },
  {
    path:'/detail',
    component: detail,
    meta: {
      title:'图书兄弟-详情页'
    }
  },
  {
    path:'/address',
    component: address,
    meta: {
      title:'地址'
    }
  },
  {
    path:'/newadd',
    component: newadd,
    meta: {
      title:'修改地址'
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.isAuthRequired && store.state.user.isLogin === false) {
    Notify('您还没有登录， 请先登录');
    return next('/login');
  }else{
    next();
  }
  document.title = to.meta.title
})
export default router

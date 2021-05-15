import Vue from 'vue'
import Router from 'vue-router'
//@/===> src/，不受当前文件路径影响
import Test from '@/views/test/test.vue'

import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/common/home.vue'
import AdminInfo from '@/views/superAdmin/adminInfo.vue'
import StudentInfo from '@/views/superAdmin/studentInfo.vue'
import ClassInfo from '@/views/superAdmin/classInfo.vue'
import FaceInfo from '@/views/superAdmin/faceInfo.vue'
import DormitoryInfo from '@/views/superAdmin/dormitoryInfo.vue'
import Record from '@/views/admin/recordInfo.vue'
import Setting from '@/views/admin/setting.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    // name: 'layout',//当有子路由时，父路由不用取名字name，取了名字会有无意义的警告
    component: Layout,
    children: [
      {
        path: '/home', //''path为空，会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/studentInfo',
        name: 'studentInfo',
        component: StudentInfo
      },
      {
        path: '/adminInfo',
        name: 'adminInfo',
        component: AdminInfo
      },
      {
        path: '/classInfo',
        name: 'classInfo',
        component: ClassInfo
      },
      {
        path: '/faceInfo',
        name: 'faceInfo',
        component: FaceInfo
      },
      {
        path: '/dormitoryInfo',
        name: 'dormitoryInfo',
        component: DormitoryInfo
      },
      {
        path: '/record',
        name: 'record',
        component: Record
      }, {
        path: '/setting',
        name: 'setting',
        component: Setting
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]
const router = new Router({
  routes
})
//导航守卫 所有页面都经过它
//to :要跳转的页面
//from： 从哪个页面跳转而来
//next： 放行的方法 next()
// router.beforeEach((to, from, next) => {
//   console.log('to:', to)
//   console.log('from:', from)
//   const user = JSON.parse(window.localStorage.getItem('user'))
//   if (to.path !== '/login') {
//     if (user) {
//       //已登录，放行
//       next()
//     } else {
//       next('/login') //未登录，重定向到登录
//     }
//   } else {
//     next()//登录页面放行
//   }
// })
export default router

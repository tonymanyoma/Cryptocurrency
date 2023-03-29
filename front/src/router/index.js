import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'
// import Welcome from '../views/Welcome.vue'
import Login from '../views/Login/Index.vue'
import Home from '../views/Home/Index.vue'
import Register from '../views/Register/Index.vue'
import Profile from '../views/Profile/Index.vue'

Vue.use(VueRouter)
/*eslint-disable */
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const token = window.localStorage.getItem('token')
       if (token ) {
         next();
       } else {
         next('/');
       }
   },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const token = window.localStorage.getItem('token')
       if (token ) {
         next();
       } else {
         next('/');
       }
   },
  }

]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 }
    if (savedPosition) position = savedPosition
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(position)
      }, 300)
    })
  }
})

router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) return next()
  store.state.user ? next() : next({ name: 'signIn' })
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './map'
import store from 'stores'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const beforeEach = async (to, from, next) => {
  await !!router.app.$root
  await router.app.$root.onReady()
  return beforeEachAuth(to, from, next)
}

const beforeEachAuth = async (to, from, next) => {
  const { status, token } = store.state.AUTH
  const isAuth = status === 1 && !!token
  if (to.meta.requiresAuth && !isAuth) {
    return next({name: 'login'})
  }

  next()
}

router.beforeEach((to, from, next) => {
  beforeEach(to, from, next)
})

export default router

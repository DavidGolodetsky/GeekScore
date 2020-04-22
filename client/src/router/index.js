import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/HomePage';
import GameList from '@/views/GameList';
import store from '@/store';

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/games',
    name: 'games',
    component: GameList,
    meta: { requiresAuth: true },
  },
  {
    path: '/game/:gameId',
    name: 'game',
    props: true,
    component: () => import(/* webpackChunkName: "game" */ '../views/GameDetails'),
    beforeEnter: (to, from, next) => {
      // TODO:rewrite with game getter, same for team
      const isGame = store.getters['games/games'].find(game => game.id === to.params.gameId);
      if (isGame) {
        next()
      } else {
        next({ name: "NotFound" })
      }
      if (from.name === 'games') {
        store.dispatch('teams/setTeams', to.params.gameId)
      }
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/team/:teamId',
    name: 'team',
    props: true,
    component: () => import(/* webpackChunkName: "team" */ '../views/TeamDetails'),
    meta: { requiresAuth: true },
  },
  {
    path: "/signin",
    name: "signIn",
    component: () => import(/* webpackChunkName: "signIn" */ '../views/SignIn')
  },
  {
    path: "/signup",
    name: "signUp",
    component: () => import(/* webpackChunkName: "signUp" */ '../views/SignUp')
  },
  {
    path: "/reset",
    name: "resetPass",
    component: () => import(/* webpackChunkName: "resetPass" */ '../views/ResetPassword')
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound')
  }
]

const router = new Router({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 }
    if (savedPosition) {
      position = savedPosition
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position)
      }, 300)
    })
  }
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['user/user']) {
      next()
    } else {
      next({ name: "signIn" })
    }
  } else {
    next()
  }
})

export default router;

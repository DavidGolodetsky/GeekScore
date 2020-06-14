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
    component: HomePage,
    // TODO: add vue-meta 
    meta: {
      title: "Geek Score - Homepage",
      metaTags: {
        name: "description",
        content: "A starting page where described the idea of Geek Score"
      }
    }
  },
  {
    path: '/games',
    name: 'games',
    component: GameList,
    meta: {
      requiresAuth: true,
      title: "Geek Score - Games page",
      metaTags: {
        name: "description",
        content: "A list of user's games"
      }
    }
  },
  {
    path: '/game/:gameId',
    name: 'game',
    props: true,
    component: () => import(/* webpackChunkName: "game" */ '../views/GameDetails'),
    meta: {
      requiresAuth: true,
      title: "Geek Score - Game page",
      metaTags: {
        name: "description",
        content: "Game details page"
      }
    }
  },
  {
    path: '/team/:teamId',
    name: 'team',
    props: true,
    component: () => import(/* webpackChunkName: "team" */ '../views/TeamDetails'),
    meta: {
      requiresAuth: true,
      title: "Geek Score - Team page",
      metaTags: {
        name: "description",
        content: "Team details page"
      }
    }
  },
  {
    path: "/signin",
    name: "signIn",
    component: () => import(/* webpackChunkName: "signIn" */ '../views/SignIn'),
    meta: {
      title: "Geek Score - Sign in page",
      metaTags: {
        name: "description",
        content: "A page for signing in"
      }
    }
  },
  {
    path: "/signup",
    name: "signUp",
    component: () => import(/* webpackChunkName: "signUp" */ '../views/SignUp'),
    meta: {
      title: "Geek Score - Sign up page",
      metaTags: {
        name: "description",
        content: "A page for signing up"
      }
    }
  },
  {
    path: "/reset",
    name: "resetPass",
    component: () => import(/* webpackChunkName: "resetPass" */ '../views/ResetPassword'),
    meta: {
      title: "Geek Score - Reset password page",
      metaTags: {
        name: "description",
        content: "A page for resetting a password"
      }
    }
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound'),
    meta: {
      title: "Geek Score - Not found page",
      metaTags: {
        name: "description",
        content: "An error page"
      }
    }
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
  store.dispatch('setError')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['user/getUser']) {
      next()
    } else {
      next({ name: "signIn" })
    }
  } else {
    next()
  }
})

export default router;

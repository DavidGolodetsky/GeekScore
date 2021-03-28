import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home'),
    meta: {
      title: 'Geek Score - Homepage',
      metaTags: {
        name: 'description',
        content: 'A starting page where described the idea of Geek Score'
      }
    }
  },
  {
    path: '/games',
    name: 'games',
    component: () => import(/* webpackChunkName: "games" */ '../pages/Games'),
    meta: {
      requiresAuth: true,
      title: 'Geek Score - Games page',
      metaTags: {
        name: 'description',
        content: "A list of user's games"
      }
    }
  },
  {
    path: '/game/:gameId',
    name: 'game',
    props: true,
    component: () => import(/* webpackChunkName: "game" */ '../pages/Game'),
    meta: {
      requiresAuth: true,
      title: 'Geek Score - Game page',
      metaTags: {
        name: 'description',
        content: 'Game details page'
      }
    },
    beforeEnter(to, _, next) {
      const game = store.getters['games/getGame'](to.params.gameId)
      game ? next() : next({ name: 'NotFound' })
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../pages/Profile'),
    meta: {
      requiresAuth: true,
      title: 'Geek Score - Profile page',
      metaTags: {
        name: 'User Profile',
        content: 'User Profile page'
      }
    }
  },
  {
    path: '/team/:teamId',
    name: 'team',
    props: true,
    component: () => import(/* webpackChunkName: "team" */ '../pages/Team'),
    meta: {
      requiresAuth: true,
      title: 'Geek Score - Team page',
      metaTags: {
        name: 'description',
        content: 'Team details page'
      }
    },
    beforeEnter(to, _, next) {
      const game = store.getters['teams/getTeam'](to.params.teamId)
      game ? next() : next({ name: 'NotFound' })
    }
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "signIn" */ '../pages/SignIn'),
    meta: {
      title: 'Geek Score - Sign in page',
      metaTags: {
        name: 'description',
        content: 'A page for Signing In in'
      }
    }
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import(/* webpackChunkName: "signUp" */ '../pages/SignUp'),
    meta: {
      title: 'Geek Score - Sign up page',
      metaTags: {
        name: 'description',
        content: 'A page for Signing up up'
      }
    }
  },
  {
    path: '/reset',
    name: 'resetPass',
    component: () =>
      import(/* webpackChunkName: "resetPass" */ '../pages/ResetPassword'),
    meta: {
      title: 'Geek Score - Reset password page',
      metaTags: {
        name: 'description',
        content: 'A page for resetting a password'
      }
    }
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import(/* webpackChunkName: "tools" */ '../pages/Tools'),
    meta: {
      requiresAuth: true,
      title: 'Geek Score - Tools page',
      metaTags: {
        name: 'description',
        content: 'A list of tools for games'
      }
    }
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../pages/NotFound'),
    meta: {
      title: 'Geek Score - Not found page',
      metaTags: {
        name: 'description',
        content: 'An error page'
      }
    }
  }
]

export default routes

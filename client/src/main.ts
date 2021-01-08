import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueOffline from 'vue-offline'
import VueCompositionAPI from '@vue/composition-api'
import '@/globalComponents'
import './registerServiceWorker'

const isDev = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = isDev
Vue.config.performance = isDev

Vue.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info)
  // TODO:sent to sentry
}

Vue.prototype.$log = console.log

Vue.use(VueCompositionAPI)

Vue.use(VueOffline, {
  mixin: false,
  storage: false
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

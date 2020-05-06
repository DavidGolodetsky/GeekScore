import Vue from 'vue';
import App from './App';
import vuetify from './plugins/vuetify';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import VueOffline from 'vue-offline';
import '@/globalComponents';


const isDev = process.env.NODE_ENV !== "production";

Vue.config.productionTip = false
Vue.config.performance = isDev;

Vue.use(VueOffline, {
  mixin: false,
  storage: false
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue';
import App from './App';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import VueOffline from 'vue-offline';
import '@/globalComponents';
import './registerServiceWorker';


const isDev = process.env.NODE_ENV !== "production";

Vue.config.productionTip = isDev
Vue.config.performance = isDev;
Vue.config.errorHandler = (err, vm, info) => console.error(`Error: ${err.toString()}; Additional info: ${info}; Spot: ${vm}`);
Vue.config.warnHandler = (err, vm, info) => console.warn(`Warning: ${err.toString()}; Additional info: ${info}; Spot: ${vm}`);

Vue.prototype.$log = console.log

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

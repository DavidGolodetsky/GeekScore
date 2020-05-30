import Vue, { createApp, h } from 'vue';
import App from './App';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/globalComponents';
// TODO: uncomment when you'll develop this
// import VueOffline from 'vue-offline';


const isDev = process.env.NODE_ENV !== "production";

Vue.config.performance = isDev;
Vue.prototype.$log = console.log

createApp({
  vuetify,
  render: () => h(App)
}).use(router).use(store).mount('#app')

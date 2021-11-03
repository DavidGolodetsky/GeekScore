import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import VueOffline from 'vue-offline';
import VueGtag from 'vue-gtag';
import VueCompositionAPI from '@vue/composition-api';
import './registerServiceWorker';

const isDev = process.env.NODE_ENV !== 'production';

Vue.config.productionTip = isDev;
Vue.config.performance = isDev;

Vue.config.errorHandler = (err, vm, info) => {
  // eslint-disable-next-line no-console
  console.error(err, vm, info);
};

// eslint-disable-next-line no-console
Vue.prototype.$log = console.log;

Vue.use(VueCompositionAPI);

Vue.use(VueGtag, { config: { id: 'G-K9MXTWVK3R' } });

Vue.use(VueOffline, {
  mixin: false,
  storage: false
});

// Registering global components automatically
const requireComponent = require.context(
  './components',
  true,
  /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');
  Vue.component(baseComponentName, baseComponentConfig);
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');

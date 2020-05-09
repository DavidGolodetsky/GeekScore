import Vue from 'vue'

Vue.component('TheAlert',
    () => import(/* webpackChunkName: "theAlert" */  '@/components/TheAlert')
)

Vue.component(
    'TheDialog',
    () => import(/* webpackChunkName: "theDialog" */  '@/components/TheDialog')
)

Vue.component(
    'TheGoBack',
    () => import(/* webpackChunkName: "theGoBack" */  '@/components/TheGoBack')
)
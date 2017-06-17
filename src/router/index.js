import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Router from 'vue-router'
import Top from '@/pages/Top'
import 'whatwg-fetch'

Vue.use(Router)
Vue.use(VueMaterial)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    }
  ]
})

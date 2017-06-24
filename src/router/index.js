import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/pages/Top'

Vue.use(Router)

const routes = [
  { path: '/', name: 'articles', component: Top },
  { path: '/tag/:tagName', name: 'tag_articles', component: Top }
]
export default new Router({routes})


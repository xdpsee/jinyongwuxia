import Vue from 'vue'
import Router from 'vue-router'
import BookList from '../components/list/BookList'
import Reader from '../components/reader/Reader'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: BookList
    },
    {
      path: '/book/:id',
      component: Reader
    }
  ]
})

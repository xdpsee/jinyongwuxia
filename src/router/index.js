import Vue from 'vue'
import Router from 'vue-router'
import BookList from '../components/books/BookList'
import EPubReader from '../components/reader/EPubReader'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: BookList
        },
        {
            path:'/book/:id',
            component: EPubReader
        }
    ]
})

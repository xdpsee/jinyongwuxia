import Vue from 'vue'
import Router from 'vue-router'
import BookShelf from '../components/shelf/BookShelf'
import BookReader from '../components/reader/BookReader'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: BookShelf
        },
        {
            path:'/book/:id',
            component: BookReader
        }
    ]
})

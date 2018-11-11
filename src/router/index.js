import Vue from 'vue'
import Router from 'vue-router'
import BookShelf from '../components/shelf/BookShelf'
import BookReader from '../components/reader/BookReader'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            component: BookShelf
        },
        {
            path: '/book/:id',
            component: BookReader
        }
    ]
})

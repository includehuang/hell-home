import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/page/home/Home'),
        },
        {
            path: '*',
            redirect: '/exception/404',
        }
    ]
})

export default router

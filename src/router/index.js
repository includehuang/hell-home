import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from "@/layout/BasicLayout"

Vue.use(Router)

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

let router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: BasicLayout,
            meta: {title: '/'},
            children: [
                {
                    path: '/homeTemp',
                    redirect: '/home',
                    component: RouteView,
                    meta: {title: 'menu.dashboard'},
                    children: [
                        {
                            path: '/home',
                            name: 'HomePage',
                            component: () => import('@/components/HelloWorld'),
                            meta: {title: 'home.title'}
                        },
                    ]
                },
                // 异常页面
                {
                    path: '/exception',
                    name: 'exception',
                    component: RouteView,
                    redirect: '/exception/403',
                    meta: {title: 'menu.exception', icon: 'warning', permission: ['exception']},
                    children: [
                        {
                            path: '/exception/403',
                            name: 'Exception403',
                            component: () => import(/* webpackChunkName: "fail" */ '@/page/exception/403'),
                            meta: {title: 'menu.exception.not-permission', permission: ['exception']}
                        },
                        {
                            path: '/exception/404',
                            name: 'Exception404',
                            component: () => import(/* webpackChunkName: "fail" */ '@/page/exception/404'),
                            meta: {title: 'menu.exception.not-find', permission: ['exception']}
                        },
                        {
                            path: '/exception/500',
                            name: 'Exception500',
                            component: () => import(/* webpackChunkName: "fail" */ '@/page/exception/500'),
                            meta: {title: 'menu.exception.server-error', permission: ['exception']}
                        }
                    ]
                },
            ]
        },
        // 404重定向
        {
            path: '*',
            redirect: '/exception/404',
        }
    ]
})

export default router

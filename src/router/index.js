import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from "@/layout/BasicLayout"

Vue.use(Router)

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

const BasicRouter = {
    path: '/',
    redirect: '/home',
    component: BasicLayout,
    meta: {title: '/', icon: 'home'},
    children: [
        {
            path: '/home',
            redirect: '/home/index',
            component: RouteView,
            meta: {title: 'menu.dashboard', icon: 'home'},
            children: [
                {
                    path: '/home/index',
                    name: 'HomeIndex',
                    component: () => import('@/page/home/Home'),
                    meta: {title: 'menu.dashboard.home', icon: 'home'}
                },
            ]
        },
        // 异常页面
        {
            path: '/exception',
            name: 'exception',
            component: RouteView,
            redirect: '/exception/403',
            meta: {title: 'menu.exception', hidden: true, icon: 'warning'},
            children: [
                {
                    path: '/exception/403',
                    name: 'Exception403',
                    component: () => import(/* webpackChunkName: "fail" */ '@/page/exception/403'),
                    meta: {title: 'menu.exception.not-permission', hidden: true, icon: 'warning'}
                },
                {
                    path: '/exception/404',
                    name: 'Exception404',
                    component: () => import(/* webpackChunkName: "fail" */ '@/page/exception/404'),
                    meta: {title: 'menu.exception.not-find', hidden: true, icon: 'warning'}
                },
                {
                    path: '/exception/500',
                    name: 'Exception500',
                    component: () => import(/* webpackChunkName: "fail" */ '@/page/exception/500'),
                    meta: {title: 'menu.exception.server-error', hidden: true, icon: 'warning'}
                }
            ]
        },
    ]
}

let router = new Router({
    routes: [
        BasicRouter,
        {
            path: '/subfield',
            redirect: '/subfield/index',
            component: BasicLayout,
            meta: {title: '/subfield'},
            children: [
                {
                    path: '/subfieldTemp',
                    redirect: '/subfield/index',
                    component: RouteView,
                    children: [
                        {
                            path: '/subfield/index',
                            name: 'SubfieldIndex',
                            component: () => import('@/subfield/Index'),
                            meta: {title: 'subfield.index'}
                        }
                    ]
                }
            ]
        },
        {
            path: '/timer',
            name: 'timer',
            component: () => import('@/subfield/timer/Timer')
        },
        // 404重定向
        {
            path: '*',
            redirect: '/exception/404',
        }
    ]
})

function trans(router = []) {
    let temp = []
    router.forEach(item => {
        // if (!item.meta.hidden) {
        if (item.children) {
            temp.push({
                title: item.meta.title,
                key: item.path,
                icon: item.meta.icon,
                children: trans(item.children)
            })
        } else {
            temp.push({
                title: item.meta.title,
                key: item.path,
                icon: item.meta.icon,
            })
        }
        // }
    })
    return temp
}


export default router

export const menus  = trans(BasicRouter.children)

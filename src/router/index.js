import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from "@/layout/BasicLayout"
import UserLayout from "@/layout/UserLayout"

Vue.use(Router)

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

const UserRouter = {
    path: '/user',
    redirect: '/user/index',
    component: UserLayout,
    meta: {title: '/user', icon: 'home'},
    children: [
        {
            path: '/user/index',
            redirect: '/login',
            component: RouteView,
            meta: {title: 'menu.user', icon: 'home'},
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: () => import('@/page/user/Login'),
                    meta: {title: 'menu.user.login', icon: 'home'}
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: () => import('@/page/user/register'),
                    meta: {title: 'menu.user.register', icon: 'home'}
                }
            ]
        }
    ]
}

/* 基于BasicLayout的页面，默认显示在页面顶部导航栏，配置meta.disabled = true后隐藏 */
const BasicRouter = {
    path: '/',
    redirect: '/Home',
    component: BasicLayout,
    meta: {title: '/', icon: 'home'},
    children: [
        {
            path: '/home',
            redirect: '/home/index',
            component: RouteView,
            meta: {title: 'menu.home', icon: 'home'},
            children: [
                {
                    path: '/home/index',
                    name: 'HomeIndex',
                    component: () => import('@/page/home/Home'),
                    meta: {title: 'menu.home.index', icon: 'home'}
                },
            ]
        },
        {
            path: '/Teyvat',
            redirect: '/Teyvat/index',
            component: RouteView,
            meta: {title: 'menu.teyvat', icon: 'home'},
            children: [
                {
                    path: '/Teyvat/index',
                    name: 'TeyvatIndex',
                    component: () => import('@/page/Teyvat/Teyvat'),
                    meta: {title: 'menu.teyvat.index', icon: 'home'},
                    beforeEnter: (to, from, next) => {
                        next(false)
                        window.open('https://bbs.mihoyo.com/ys/')
                    }
                },
            ]
        },
        {
            path: '/TwoDimensions',
            redirect: '/TwoDimensions/index',
            component: RouteView,
            meta: {title: 'menu.twoDimensions', icon: 'home'},
            children: [
                {
                    path: '/TwoDimensions/index',
                    name: 'TwoDimensionsIndex',
                    component: () => import('@/page/TwoDimensions/TwoDimensions'),
                    meta: {title: 'menu.twoDimensions.index', icon: 'home'}
                },
            ]
        },
        {
            path: '/Eguo',
            redirect: '/Eguo/index',
            component: RouteView,
            meta: {title: 'menu.eguo', icon: 'home'},
            children: [
                {
                    path: '/Eguo/index',
                    name: 'EguoIndex',
                    component: () => import('@/page/Eguo/Eguo'),
                    meta: {title: 'menu.eguo.index', icon: 'home'}
                },
            ]
        },
        {
            path: '/Front',
            redirect: '/Front/index',
            component: RouteView,
            meta: {title: 'menu.front', icon: 'home'},
            children: [
                {
                    path: '/Front/index',
                    name: 'HomeIndex',
                    component: () => import('@/page/Front/Front'),
                    meta: {title: 'menu.front.index', icon: 'home'}
                },
            ]
        },
        {
            path: '/Study',
            redirect: '/Study/index',
            component: RouteView,
            meta: {title: 'menu.study', icon: 'home'},
            children: [
                {
                    path: '/Study/index',
                    name: 'StudyIndex',
                    component: () => import('@/page/Study/Study'),
                    meta: {title: 'menu.study.index', icon: 'home'}
                },
            ]
        },
        {
            path: '/Essay',
            redirect: '/Essay/index',
            component: RouteView,
            meta: {title: 'menu.essay', icon: 'home'},
            children: [
                {
                    path: '/Essay/index',
                    name: 'EssayIndex',
                    component: () => import('@/page/Essay/Essay'),
                    meta: {title: 'menu.essay.index', icon: 'home'}
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
        // 测试页面
        {
            path: '/test',
            name: 'test',
            component: RouteView,
            redirect: '/test/index',
            meta: {title: 'test', hidden: true, icon: 'warning'},
            children: [
                {
                    path: '/test/index',
                    name: 'TestIndex',
                    component: () => import(/* webpackChunkName: "fail" */ '@/test/Index'),
                    meta: {title: 'test.index', hidden: false, icon: 'warning'}
                },
                {
                    path: '/test/player',
                    name: 'TestPlayer',
                    component: () => import(/* webpackChunkName: "fail" */ '@/test/player/Player'),
                    meta: {title: 'test.index', hidden: false, icon: 'warning'}
                }
            ]
        },
    ]
}

/* 功能路由，在特定情况下用于占位实现特殊效果例如404等等 */
const FunctionRouter = {
    path: '*',
    redirect: '/exception/404',
}

/* 扩展路由，默认不显示在顶部导航栏 */
const SubfieldRouter = {
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
}

/* 补充路由，独立于主要系统之外的路由，不影响系统功能 */
const SupplementRouter = {
    path: '/timer',
    name: 'timer',
    component: () => import('@/subfield/timer/Timer')
}

/* 路由优先级 BasicRouter > SubfieldRouter > SupplementRouter > FunctionRouter */
let router = new Router({
    routes: [
        BasicRouter,
        UserRouter,
        SubfieldRouter,
        SupplementRouter,
        FunctionRouter
    ]
})

// 将路由列表转换为导航列表的方法
function trans(router = []) {
    let temp = []
    router.forEach(item => {
        if (!item.meta.hidden) {
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
        }
    })
    return temp
}


export default router

// 默认导航
export const menus = trans(BasicRouter.children)

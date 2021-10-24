import Vue from 'vue'
import Router from 'vue-router'
import utils from "@/common/util/utils"
import store from "@/store/store"
import BasicLayout from "@/layout/BasicLayout"
import UserLayout from "@/layout/UserLayout"
import {message} from "ant-design-vue"
import i18n from "@/lang/i18n"

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
        // 首页
        {
            path: '/home',
            redirect: '/home/index',
            name: 'Home',
            component: RouteView,
            meta: {title: 'menu.home', icon: 'home', NoChildren: true},
            children: [
                {
                    path: '/home/index',
                    name: 'HomeIndex',
                    component: () => import('@/page/home/Home'),
                    meta: {title: 'menu.home.index', icon: 'home'}
                },
            ]
        },
        // 提瓦特
        {
            path: '/teyvat',
            redirect: '/teyvat/index',
            name: 'Teyvat',
            component: RouteView,
            meta: {title: 'menu.teyvat', icon: 'switcher', NoChildren: true, hidden: true},
            children: [
                {
                    path: '/teyvat/index',
                    name: 'TeyvatIndex',
                    component: () => import('@/page/teyvat/Teyvat'),
                    meta: {title: 'menu.teyvat.index', icon: 'switcher'},
                    beforeEnter: (to, from, next) => {
                        next(false)
                        window.open('https://bbs.mihoyo.com/ys/')
                    }
                },
            ]
        },
        // 二次元
        {
            path: '/twoDimensions',
            redirect: '/twoDimensions/index',
            name: 'TwoDimensionsI',
            component: RouteView,
            meta: {title: 'menu.twoDimensions', icon: 'switcher', NoChildren: true, hidden: true},
            children: [
                {
                    path: '/twoDimensions/index',
                    name: 'TwoDimensionsIndex',
                    component: () => import('@/page/twoDimensions/TwoDimensions'),
                    meta: {title: 'menu.twoDimensions.index', icon: 'switcher', permission: []}
                },
            ]
        },
        // 祎果
        {
            path: '/eguo',
            redirect: '/eguo/index',
            name: 'Eguo',
            component: RouteView,
            meta: {title: 'menu.eguo', icon: 'eye', NoChildren: true},
            children: [
                {
                    path: '/eguo/index',
                    name: 'EguoIndex',
                    component: () => import('@/page/eguo/Eguo'),
                    meta: {title: 'menu.eguo.index', icon: 'eye'}
                },
            ]
        },
        // 前端
        {
            path: '/front',
            redirect: '/front/index',
            name: 'Front',
            component: RouteView,
            meta: {title: 'menu.front', icon: 'switcher', NoChildren: true},
            children: [
                {
                    path: '/front/index',
                    name: 'FrontIndex',
                    component: () => import('@/page/front/Front'),
                    meta: {title: 'menu.front.index', icon: 'switcher'}
                },
            ]
        },
        // 学习
        {
            path: '/study',
            redirect: '/study/index',
            component: RouteView,
            name: 'Study',
            meta: {title: 'menu.study', icon: 'book', NoChildren: true},
            children: [
                {
                    path: '/study/index',
                    name: 'StudyIndex',
                    component: () => import('@/page/study/Study'),
                    meta: {title: 'menu.study.index', icon: 'book'}
                },
            ]
        },
        // 随笔
        {
            path: '/essay',
            redirect: '/essay/index',
            name: 'Essay',
            component: RouteView,
            meta: {title: 'menu.essay', icon: 'read', NoChildren: true, hidden: true},
            children: [
                {
                    path: '/essay/index',
                    name: 'EssayIndex',
                    component: () => import('@/page/essay/Essay'),
                    meta: {title: 'menu.essay.index', icon: 'read'}
                },
            ]
        },
        // 书架
        {
            path: '/bookshelf',
            redirect: '/bookshelf/index',
            name: 'Bookshelf',
            component: RouteView,
            meta: {title: 'menu.bookshelf', icon: 'read', NoChildren: true},
            children: [
                {
                    path: '/bookshelf/index',
                    name: 'BookshelfIndex',
                    component: () => import('@/page/bookshelf/Bookshelf'),
                    meta: {title: 'menu.bookshelf.index', icon: 'read'}
                },
                {
                    path: '/bookshelf/reader',
                    name: 'ReaderIndex',
                    component: () => import('@/page/bookshelf/Reader'),
                    meta: {title: 'menu.reader.index', icon: 'read'}
                },
            ]
        },
        // 个人
        {
            path: '/personal',
            redirect: '/personal/index',
            component: RouteView,
            meta: {title: 'menu.personal', icon: 'user'},
            children: [
                {
                    path: '/personal/index',
                    name: 'PersonalIndex',
                    component: () => import('@/page/personal/Personal'),
                    meta: {title: 'menu.personal.index', icon: 'user'},
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

router.beforeEach((to, from, next) => {
    const permission = to.meta.permission
    if (!permission || !permission.length || permission.includes('default')) {
        next()
    }else if (permission.includes('forbidden') || !utils.isHaveSameElement(store.state.permission, permission)) {
        message.error(i18n.t('router.not.permission'))
        next(false)
        if (from.path === '/') { // 没有from（例如浏览器直接输入URl）默认返回首页
            next({name: 'HomeIndex'})
        }
    }else {
        next()
    }
})

// 将路由列表转换为导航列表的方法
function trans(router = []) {
    let temp = []
    router.forEach(item => {
        if (!item.meta.hidden) {
            if (item.children && !item.meta.NoChildren) {
                temp.push({
                    title: item.meta.title,
                    key: item.name,
                    icon: item.meta.icon,
                    children: trans(item.children)
                })
            } else {
                temp.push({
                    title: item.meta.title,
                    key: item.name,
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

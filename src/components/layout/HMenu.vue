<template>
    <a-menu
        :default-selected-keys="defaultSelectedKeys"
        :mode="mode"
        :theme="theme"
        :class="innerClass"
    >
        <template v-for="item in menus">
            <a-menu-item v-if="!item.children" :key="item.key">
                <a-icon :type="item.icon" v-if="item.icon"/>
                <span>{{ translationFun(item.title) }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item" :translation="translationFun"/>
        </template>
    </a-menu>
</template>

<script>
import {Menu} from "ant-design-vue"

const list = [
    {
        key: 'index',
        title: 'index',
        icon: 'pie-chart',
    },
    {
        key: 'home',
        title: 'home',
        icon: 'pie-chart',
        children: [
            {
                key: 'home.index',
                title: 'home.index',
                icon: 'pie-chart',
            },
            {
                key: 'home.console',
                title: 'home.console',
                icon: 'pie-chart',
                children: [
                    {
                        key: 'home.console.console',
                        title: 'home.console.console',
                        icon: 'pie-chart',
                    },
                    {
                        key: 'home.console.workspace',
                        title: 'home.console.workspace',
                        icon: 'pie-chart',
                    }
                ]
            }
        ]
    },
    {
        key: 'option',
        title: 'option',
        icon: 'code',
    },
    {
        key: 'select',
        title: 'select',
        icon: 'code',
        children: [
            {
                key: 'select.index',
                title: 'select.index',
                icon: 'code',
            },
            {
                key: 'select.console',
                title: 'select.console',
                icon: 'code',
                children: [
                    {
                        key: 'select.console.console',
                        title: 'select.console.console',
                        icon: 'code',
                    },
                    {
                        key: 'select.console.workspace',
                        title: 'select.console.workspace',
                        icon: 'code',
                    }
                ]
            }
        ]
    },
    {
        key: 'option1',
        title: 'option1',
    },
    {
        key: 'option2',
        title: 'option2',
        children: [
            {
                key: 'option2.console.console',
                title: 'option2.console.console',
            },
            {
                key: 'option2.console.workspace',
                title: 'option2.console.workspace',
            }
        ]
    },
]
// noinspection JSUnresolvedVariable
const SubMenu = {
    template: `
        <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
            <a-icon :type="menuInfo.icon" v-if="menuInfo.icon"/><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.key">
                <a-icon :type="item.icon" v-if="item.icon"/>
                <span>{{ translation(item.title) }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item" :translation="translation"/>
        </template>
        </a-sub-menu>
    `,
    name: 'SubMenu',
    // must add isSubMenu: true
    isSubMenu: true,
    props: {
        ...Menu.SubMenu.props,
        // Cannot overlap with properties within Menu.SubMenu.props
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
        translation: {
            type: Function,
            default: item => {
                return item
            }
        }
    },
}
export default {
    name: "HMenu",
    components: {
        SubMenu
    },
    props: {
        menus: {
            type: Array,
            default: () => {
                return list
            }
        },
        theme: {
            type: String,
            default: 'light'
        },
        mode: {
            type: String,
            default: 'horizontal'
        },
        inlineCollapsed: {
            type: Boolean,
            default: false
        },
        innerClass: {
            type: String,
            default: 'menu-render'
        },
        defaultSelectedKeys: {
            type: Array,
            default: () => {
                return []
            }
        },
        translation: {
            type: Function,
            default: null
        }
    },
    // components: {HSubMenu},
    data() {
        return {
            translationFun: null
        }
    },
    created() {
        this.translationFun = this.translation || this.i18nRender
    },
    methods: {
        i18nRender(key) {
            console.log(key)
            return this.$t(`${key}`)
        },
    }
}
</script>

<style>

</style>

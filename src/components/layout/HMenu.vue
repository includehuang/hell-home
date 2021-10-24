<template>
    <a-menu
        :default-selected-keys="defaultSelectedKeys"
        :mode="mode"
        :theme="theme"
        :class="innerClass"
        :selectedKeys="selectedKeys"
        v-model="model"
        @click="onClickFun"
    >
        <template v-for="item in menus">
            <a-menu-item v-if="!item.children" :key="item.key">
                <a-icon :type="item.icon" v-if="item.icon"/>
                <span>{{ i18nRender(item.title) }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item"/>
        </template>
    </a-menu>
</template>

<script>
import {Menu} from "ant-design-vue"

let translation = function(key) {
    return key
}

const list = [
    {
        key: 'home',
        title: 'home',
        icon: 'home',
    },
    {
        key: 'index',
        title: 'index',
        icon: 'pie-chart',
    },
    {
        key: 'work',
        title: 'work',
        icon: 'pie-chart',
        children: [
            {
                key: 'work/index',
                title: 'work.index',
                icon: 'pie-chart',
            },
            {
                key: 'work/console',
                title: 'work.console',
                icon: 'pie-chart',
                children: [
                    {
                        key: 'work/console/console',
                        title: 'work.console.console',
                        icon: 'pie-chart',
                    },
                    {
                        key: 'work/console/workspace',
                        title: 'work.console.workspace',
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
                key: 'select/index',
                title: 'select.index',
                icon: 'code',
            },
            {
                key: 'select/console',
                title: 'select.console',
                icon: 'code',
                children: [
                    {
                        key: 'select/console/console',
                        title: 'select.console.console',
                        icon: 'code',
                    },
                    {
                        key: 'select/console/workspace',
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
                key: 'option2/console/console',
                title: 'option2.console.console',
            },
            {
                key: 'option2/console/workspace',
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
            <a-icon :type="menuInfo.icon" v-if="menuInfo.icon"/><span>{{ i18nRender(menuInfo.title) }}</span>
        </span>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.key">
                <a-icon :type="item.icon" v-if="item.icon"/>
                <span>{{ i18nRender(item.title) }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item"/>
        </template>
        </a-sub-menu>
    `,
    name: 'SubMenu',
    isSubMenu: true,
    props: {
        ...Menu.SubMenu.props,
        menuInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        i18nRender(key) {
            return translation(key)
        }
    }
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
        selectedKeys: {
            type: Array,
            default: () => {
                return []
            }
        },
        langRender: {
            type: Function,
            default: null
        },
    },
    data() {
        return {
            model: ''
        }
    },
    created() {
        if (this.$props.langRender) {
            translation = this.$props.langRender
        }else {
            translation = (key) => {
                return this.$t(`${key}`)
            }
        }
    },
    methods: {
        i18nRender(key) {
            return translation(key)
        },
        onClickFun(option) {
            if (this.$listeners.click) {
                this.$emit('click', option)
            }else {
                this.$router.push({name: option.key})
            }
        },
    }
}
</script>

<style>

</style>

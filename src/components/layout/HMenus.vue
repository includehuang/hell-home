<template>
    <a-menu
        :default-selected-keys="defaultSelectedKeys"
        :default-open-keys="defaultOpenKeys"
        :mode="mode"
        :theme="theme"
        :inline-collapsed="inlineCollapsed"
    >
        <template v-for="item in list">
<!--            <a-menu-item v-if="!item.children" :key="item.key">-->
<!--                <a-icon type="pie-chart"/>-->
<!--                <span>{{ item.title }}</span>-->
<!--            </a-menu-item>-->
<!--            <sub-menu v-else :key="item.key" :menu-info="item"/>-->

            <a-menu-item v-if="item.type === 'file'" :key="item.key">
                <a-icon type="pie-chart"/>
                <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item"/>
        </template>
    </a-menu>
</template>

<script>
// recommend use functional component
// <template functional>
//   <a-sub-menu :key="props.menuInfo.key">
//     <span slot="title">
//       <a-icon type="mail" /><span>{{ props.menuInfo.title }}</span>
//     </span>
//     <template v-for="item in props.menuInfo.children">
//       <a-menu-item v-if="!item.children" :key="item.key">
//         <a-icon type="pie-chart" />
//         <span>{{ item.title }}</span>
//       </a-menu-item>
//       <sub-menu v-else :key="item.key" :menu-info="item" />
//     </template>
//   </a-sub-menu>
// </template>
// export default {
//   props: ['menuInfo'],
// };
import { Menu } from 'ant-design-vue'
const SubMenu = {
    template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="item.type === 'file'" :key="item.key">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
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
    },
}
export default {
    components: {
        'sub-menu': SubMenu,
    },
    props: {
        /**
         * 菜单类型（不同类型渲染规则不一致）
         * menus： 菜单，空Child不渲染
         */
        type: {
            type: String,
            default: "menus"
        },
        list: {
            type: Array,
            default: () => {
                return [
                    {
                        key: '1',
                        title: 'Option 1',
                    },
                    {
                        key: '2',
                        title: 'Navigation 2',
                        children: [
                            {
                                key: '2.1',
                                title: 'Navigation 3',
                                children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
                            },
                        ],
                    },
                ]
            }
        },
        defaultSelectedKeys: {
            type: Array,
            default: () => {
                return []
            }
        },
        defaultOpenKeys: {
            type: Array,
            default: () => {
                return []
            }
        },
        mode: {
            type: String,
            default: "inline"
        },
        theme: {
            type: String,
            default: "dark"
        },
        inlineCollapsed: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            collapsed: false,
        }
    },
}
</script>

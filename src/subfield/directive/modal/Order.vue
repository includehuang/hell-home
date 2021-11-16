<template>
    <a-modal @cancel="close('orderModal')" @ok="close('orderModal')"
             :destroyOnClose="true" :maskClosable="false"
             :okText="'确认'" :cancelText="'取消'"
             :visible="true"
             :title="title"
             :width="500"
    >
        <label>
            <p v-hook id="out">这一行字绑定了监听，id：out</p>
            <a-row>
                <a-button size="small" @click="list.push([list.length])">测试更新效果</a-button>
                <a-button size="small" @click="list1.push([list1.length])">测试子元素更新效果</a-button>
                <a-button size="small" @click="list1.push([list1.length]) && list.push([list.length])">测试一起更新效果</a-button>
            </a-row>
            <div v-for="item in list" :key="item">
                <p>外部元素内容</p>
            </div>
            <a-card>
                <p v-hook id="in">这一行字绑定了监听，id：in</p>
                <div v-for="item in list1" :key="item">
                    <p>内部元素内容</p>
                </div>
            </a-card>
            <a-button v-if="!showMark" size="small" @click="showMark = true">显示顺序</a-button>
            <markdown-it-vue v-if="showMark" :content="text"></markdown-it-vue>
        </label>
    </a-modal>
</template>

<script>
import DIRECTIVES from "@/subfield/directive/index"
export default {
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '默认标题'
        }
    },
    data() {
        return {
            list: [],
            list1: [],
            showMark: false,
            text: '```mermaid\n' +
                'graph TD;\n' +
                '    父级节点bind-->子级节点bind;\n' +
                '    子级节点bind-->父级节点inserted;\n' +
                '    父级节点inserted-->子级节点inserted;\n' +
                '    父级节点update-->父级节点componentUpdated;\n' +
                '    父级节点componentUpdated-->子级节点update;\n' +
                '    子级节点update-->子级节点componentUpdated;\n' +
                '    父级节点unbind-->子级节点unbind;\n' +
                // '    父级节点unbind-->子级节点componentUpdated;\n' +
                // '    子级节点componentUpdated-->子级节点componentUpdated;\n' +
                '```'
        }
    },
    mounted() {
    },
    methods: {
        open(modal) {
            this.$emit('open', modal)
        },
        close(modal) {
            this.$emit('close', modal)
        },
    },
    directives: DIRECTIVES
}
</script>

<style scoped>

</style>

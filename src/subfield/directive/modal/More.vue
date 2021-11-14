<template>
    <a-modal @cancel="close('moreModal')" @ok="close('moreModal')"
             :destroyOnClose="true" :maskClosable="false"
             :visible="true"
             :okText="'确认'" :cancelText="'取消'"
             :title="title"
             :width="900"
    >
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="可拖拽div">
                <div style="height: 600px">
                    <div style="position: absolute; height: 100px; width: 100px; background: #1890ff" v-draggable/>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="自带删除按钮" force-render>
                <div style="height: 600px">
                    <div style="position: absolute; height: 100px; width: 100px; background: #1890ff" v-del/>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="点击打开网页">
                <div style="height: 600px">
                    <h2 v-open="'//baidu.com'">点击这行字会跳转到百度首页</h2>
                </div>
            </a-tab-pane>
        </a-tabs>
    </a-modal>
</template>

<!--suppress HtmlUnknownAttribute -->
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
            message: 'Hello World！',
            change: '默认值',
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

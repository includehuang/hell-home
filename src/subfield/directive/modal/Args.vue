<template>
    <a-modal @cancel="close('argsModal')" @ok="close('argsModal')"
             :destroyOnClose="true" :maskClosable="false"
             :visible="true"
             :okText="'确认'" :cancelText="'取消'"
             :title="title"
    >
        <a-alert :message="html">
        </a-alert>
        <label>
            <p v-args:foo.a.b="message"/>
        </label>
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
            html: '\n' +
                '        <label>\n' +
                '            <p v-args:foo.a.b="message"/>\n' +
                '        </label>'
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

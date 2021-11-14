<template>
    <a-modal @cancel="close('focusModal')" @ok="close('focusModal')"
             :destroyOnClose="true" :maskClosable="false"
             :visible="true"
             :okText="'确认'" :cancelText="'取消'"
             :title="title"
    >
        <label>
            <input v-focus-x/>
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
        return {}
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

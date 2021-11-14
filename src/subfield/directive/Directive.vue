<template>
    <div id="Directive">
        <directive-doc @open="openModal" @close="closeModal"/>
        <d-focus v-if="focusModal" @open="openModal" @close="closeModal" :title="'自动聚焦'"/>
        <test v-if="testModal" @open="openModal" @close="closeModal" :title="'执行顺序'"/>
        <args v-if="argsModal" @open="openModal" @close="closeModal" :title="'参数传递'"/>
        <args-change v-if="changeModal" @open="openModal" @close="closeModal" :title="'动态绑定'"/>
        <more v-if="moreModal" @open="openModal" @close="closeModal" :title="'更多'"/>
    </div>
</template>

<script>
import DirectiveDoc from "@/subfield/directive/DirectiveDoc"
import DFocus from "@/subfield/directive/modal/DFocus"
import DIRECTIVES from "./index"
import Test from "@/subfield/directive/modal/Test"
import Args from "@/subfield/directive/modal/Args"
import ArgsChange from "@/subfield/directive/modal/ArgsChange"
import More from "@/subfield/directive/modal/More"
export default {
    name: "Directive",
    components: {More, ArgsChange, Args, Test, DFocus, DirectiveDoc},
    props: {},
    data() {
        return {
            focusModal: false,
            testModal: false,
            argsModal: false,
            changeModal: false,
            moreModal: false,
        }
    },
    mounted() {
    },
    methods: {
        openModal(modal) {
            this[modal] = true
        },
        closeModal(modal) {
            this[modal] = false
        }
    },
    directives: DIRECTIVES
}
</script>

<style scoped>

</style>

<template>
    <div id="Directive">
        <directive-doc @open="openModal" @close="closeModal"/>
        <focus v-if="focusModal" @open="openModal" @close="closeModal" :title="'自动聚焦'"/>
        <order v-if="orderModal" @open="openModal" @close="closeModal" :title="'执行顺序'"/>
        <args v-if="argsModal" @open="openModal" @close="closeModal" :title="'参数传递'"/>
        <args-change v-if="changeModal" @open="openModal" @close="closeModal" :title="'动态绑定'"/>
        <more v-if="moreModal" @open="openModal" @close="closeModal" :title="'更多'"/>
    </div>
</template>

<script>
import DirectiveDoc from "@/subfield/directive/DirectiveDoc"
import Focus from "@/subfield/directive/modal/Focus"
import DIRECTIVES from "./index"
import Order from "@/subfield/directive/modal/Order"
import Args from "@/subfield/directive/modal/Args"
import ArgsChange from "@/subfield/directive/modal/ArgsChange"
import More from "@/subfield/directive/modal/More"
export default {
    name: "Directive",
    components: {More, ArgsChange, Args, Order, Focus, DirectiveDoc},
    props: {},
    data() {
        return {
            focusModal: false,
            orderModal: false,
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

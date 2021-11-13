<template>
    <div id="Directive">
        <directive-doc @open="openModal" @close="closeModal"/>
        <d-focus v-if="focusModal" @open="openModal" @close="closeModal"/>
        <test v-if="testModal" @open="openModal" @close="closeModal"/>
        <args v-if="argsModal" @open="openModal" @close="closeModal"/>
    </div>
</template>

<script>
import DirectiveDoc from "@/subfield/directive/DirectiveDoc"
import DFocus from "@/subfield/directive/modal/DFocus"
import DIRECTIVES from "./index"
import Test from "@/subfield/directive/modal/Test"
import Args from "@/subfield/directive/modal/Args"
export default {
    name: "Directive",
    components: {Args, Test, DFocus, DirectiveDoc},
    props: {},
    data() {
        return {
            focusModal: false,
            testModal: false,
            argsModal: false,
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

<template>
    <basic-layout :menus="subfieldMenus"/>
</template>

<script>
import BasicLayout from "@/layout/BasicLayout"
import {subfieldMenus} from "@/router"
export default {
    name: "SubfieldLayout",
    components: {BasicLayout},
    props: {},
    data() {
        return {
            subfieldMenus
        }
    },
    mounted() {
    },
    methods: {}
}
</script>

<style scoped>

</style>

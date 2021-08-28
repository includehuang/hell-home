<template>
    <div style="border: #42b983 2px">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'BlankLayout',
    mounted() {
        console.log('BlankLayout=========', this.$router)
    }
}
</script>

<style scoped>

</style>

<template>
    <a-result status="403" title="403" :sub-title="$t('message.error.403')">
        <template #extra>
            <a-button type="primary" @click="toHome">
                {{ $t('message.error.backHome') }}
            </a-button>
        </template>
    </a-result>
</template>

<script>
export default {
    name: 'Exception403',
    methods: {
        toHome() {
            this.$router.push({ path: '/' })
        }
    }
}
</script>

<template lang="pug">
    #app
        pre {{process.env.VUE_APP_BASE_API_URL }}
        router-view
</template>

<script>
export default {
    name: 'App',
    components: {},
    methods: {}
}
</script>

<style>

</style>

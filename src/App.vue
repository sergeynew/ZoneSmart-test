<template lang="pug">
    #app
        .container
            transition(name="fade" mode="out-in")
                routerView
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

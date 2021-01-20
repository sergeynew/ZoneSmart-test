<template lang="pug">
    #orders-page
        h2.page-title Orders page component
        .orders-table
        button.btn.btn_green(@click="getOrders") get orders
</template>

<script>
export default {
    data () {
        return {}
    },

    created () {
        // this.getOrders()
    },

    methods: {
        getOrders () {
            const params = {
                limit: 20,
                offset: 0
            }
            this.$store.dispatch('orders/getOrders', params)
        }
    }
}
</script>

<style>

</style>

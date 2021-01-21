<template lang="pug">
    #orders-page
        h3.page-title Таблица заказов
        .orders-table
            DataTable(
                :fields="tableFields",
                :tableData="ordersList"
            )
</template>

<script>
import { mapState } from 'vuex'
import DataTable from '@/components/common/DataTable/DataTable.vue'

export default {
    components: {
        DataTable
    },
    data () {
        // offset and limit as local here
        return {}
    },

    created () {
        this.getOrders()
    },

    computed: {
        ...mapState({
            ordersList: (state) => state.orders.ordersList,
            tableFields: (state) => state.orders.tableFields
        })
    },

    methods: {
        getOrders () {
            const params = {
                limit: 15,
                offset: 0
            }
            this.$store.dispatch('orders/getOrders', params)
        }
    }
}
</script>

<style lang='sass'>
#orders-page
    padding: 30px 0

    .page-title
        margin : 0 0 40px 0
</style>

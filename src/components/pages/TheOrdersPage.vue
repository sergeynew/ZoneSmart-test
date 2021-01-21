<template lang="pug">
    #orders-page
        h3.page-title Таблица заказов
        .orders-table
            DataTable(
                :fields="tableFields",
                :tableData="ordersList"
                :settings="pagination"
                @select-all="onSelectAll"
                @select-item="onOrderItemSelect"
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
        return {
            pagination: {
                limit: 5,
                offset: 0
            }
        }
    },

    created () {
        this.getOrders()
    },

    computed: {
        ...mapState({
            ordersList: (state) => state.orders.ordersList,
            selectedOrdersList: (state) => state.orders.selectedOrdersList,
            tableFields: (state) => state.orders.tableFields
        })
    },

    methods: {
        getOrders () {
            const { offset, limit } = this.pagination
            this.$store.dispatch('orders/getOrders', { offset, limit })
        },

        onSelectAll (isSelect) {
            this.$store.dispatch('orders/selectUnselectAllOrders', isSelect)
        },

        onOrderItemSelect (params) {
            this.$store.dispatch('orders/selectUnselectOrderItem', params)
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

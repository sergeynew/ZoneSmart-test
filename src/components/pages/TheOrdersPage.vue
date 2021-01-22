<template lang="pug">
    #orders-page
        h3.page-title Таблица заказов
        .orders-filters
            PageFilters(
                @filter="onFilter"
            )
        .orders-table
            DataTable(
                :fields="table_fields",
                :table_data="orders_list"
                :total_items="orders_count"
                @select-all="onSelectAll"
                @select-item="onOrderItemSelect"
                @paginate="onPaginate"
            )
</template>

<script>
import { mapState } from 'vuex'
import DataTable from '@/components/common/DataTable/DataTable.vue'
import PageFilters from '@/components/common/PageFilters.vue'

export default {
    components: {
        DataTable
    },

    computed: {
        ...mapState({
            orders_list: (state) => state.orders.orders_list,
            selected_orders_list: (state) => state.orders.selected_orders_list,
            table_fields: (state) => state.orders.table_fields,
            orders_count: (state) => state.orders.orders_count
        })
    },

    methods: {
        getOrders (params) {
            this.$store.dispatch('orders/getOrders', params)
        },

        onSelectAll (is_select) {
            this.$store.dispatch('orders/selectUnselectAllOrders', is_select)
        },

        onOrderItemSelect (params) {
            this.$store.dispatch('orders/selectUnselectOrderItem', params)
        },

        onPaginate ({ limit, offset }) {
            this.getOrders(limit, offset)
        },

        onFilter (value) {
            this.getOrders(value)
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

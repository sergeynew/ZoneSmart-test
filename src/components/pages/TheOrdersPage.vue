<template lang="pug">
    #orders-page
        h3.page-title Таблица заказов
        .orders-filters
            PageFilters(
                @filter-applied="onFilter"
            )
        .orders-table
            DataTable(
                :fields="table_fields",
                :table_data="orders_list"
                :total_items="orders_count"
                :default_pagination="request_params"
                :actions="table_actions"
                :is_loading="is_loading"
                @select-all="onSelectAll"
                @select-item="onOrderItemSelect"
                @paginate="onPaginate"
                @update_orders="onUpdateOrders"
                @delete_orders="onDeleteOrders"
            )
</template>

<script>
import { mapState } from 'vuex'
import DataTable from '@/components/common/DataTable/DataTable.vue'
import PageFilters from '@/components/common/PageFilters.vue'

export default {
    components: {
        DataTable,
        PageFilters
    },

    data () {
        return {
            table_actions: {
                update_orders: 'Обновить',
                delete_orders: 'Удалить'
            }
        }
    },

    computed: {
        ...mapState({
            orders_list: (state) => state.orders.orders_list,
            selected_orders_list: (state) => state.orders.selected_orders_list,
            table_fields: (state) => state.orders.table_fields,
            orders_count: (state) => state.orders.orders_count,
            request_params: (state) => state.orders.request_params,
            is_loading: (state) => state.orders.status.loading
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

        onPaginate (params) {
            this.getOrders(params)
        },

        onFilter (value) {
            // when filter implements
            // unselect all orders
            this.onSelectAll(false)
            // and refresh pagination
            this.getOrders({ search: value, offset: 0 })
        },

        onUpdateOrders () {
            this.$store.dispatch('orders/updateSelectedOrders')
        },

        onDeleteOrders () {
            this.$store.dispatch('orders/deleteSelectedOrders')
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

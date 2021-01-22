<template lang="pug">
    #orders-page
        h3.page-title Таблица заказов
        .orders-table
            DataTable(
                :fields="table_fields",
                :table_data="orders_list"
                :pagination_settings="pagination"
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
        return {
            pagination: {
                limit: 15,
                offset: 0
            }
        }
    },

    created () {
        this.getOrders()
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
        getOrders () {
            const { offset, limit } = this.pagination
            this.$store.dispatch('orders/getOrders', { offset, limit })
        },

        onSelectAll (is_select) {
            this.$store.dispatch('orders/selectUnselectAllOrders', is_select)
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

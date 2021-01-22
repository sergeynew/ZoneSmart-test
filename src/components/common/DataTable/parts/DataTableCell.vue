<template lang='pug'>
    .data-item
        component(
            :is="cell_component_name"
            :data="data"
        )
</template>

<script>
// import capitalize from '@/utils/helpers'
import CheckedItem from '../cell_items/CheckedItem.vue'
import TextItem from '../cell_items/TextItem.vue'
import PriceItem from '../cell_items/PriceItem.vue'
import DatetimeItem from '../cell_items/DatetimeItem.vue'

export default {
    components: {
        CheckedItem, DatetimeItem, TextItem, PriceItem
    },

    name: 'DataTableCell',

    props: {
        data: {},
        field_type: {
            type: String,
            default: () => ''
        }
    },

    computed: {
        cell_component_name () {
            return `${this.field_type}Item`
        }
    }
}
</script>

<style lang='sass' scoped>
    .table-row
        display: flex
        flex-direction: column
        .data-row
            display: flex
            justify-content: space-between
</style>

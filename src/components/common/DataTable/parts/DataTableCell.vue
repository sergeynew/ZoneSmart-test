<template lang='pug'>
    .data-table__cell
        component(
            :is="cell_component_name"
            :data="data"
            @toggle-dropdown-row="toggleDropdownRow"
        )
</template>

<script>
// import capitalize from '@/utils/helpers'
import CheckedItem from '../cell_items/CheckedItem.vue'
import TextItem from '../cell_items/TextItem.vue'
import PriceItem from '../cell_items/PriceItem.vue'
import DatetimeItem from '../cell_items/DatetimeItem.vue'
import DropdownItem from '../cell_items/DropdownItem.vue'

export default {
    components: {
        CheckedItem,
        DatetimeItem,
        TextItem,
        PriceItem,
        DropdownItem
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
    },

    methods: {
        toggleDropdownRow () {
            this.$emit('toggle-dropdown-row')
        }
    }
}
</script>

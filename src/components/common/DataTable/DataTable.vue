<template lang='pug'>
    .data-table
        .data-table__header
            DataTableHeader(
                :fields="fields",
                :all_selected="is_all_items_selected",
                @select-all="onSelectAll"
            )
        .data-table__body
                DataTableRow(
                    v-for="row_data, id of table_data"
                    :key="id"
                    :fields="fields",
                    :row_data="row_data",
                    :all_selected="is_all_items_selected",
                    :all_unselected="is_all_items_unselected"
                    @select-item="onSelectItem"
                )
        .data-table__pagination
            DataTablePagination(
                :pagination-settings="pagination"
            )
</template>

<script>
import DataTableHeader from './parts/DataTableHeader.vue'
import DataTableRow from './parts/DataTableRow.vue'
import DataTablePagination from './parts/DataTablePagination.vue'

export default {
    name: 'DataTable',

    components: {
        DataTableHeader,
        DataTableRow,
        DataTablePagination
    },

    props: {
        fields: {
            type: Object,
            default: () => {}
        },
        table_data: {
            type: Object,
            default: () => {}
        }
    },

    data () {
        return {
            selected_items_count: null,
            pagination: {
                from: 0,
                offset: 10
            }
        }
    },

    methods: {
        onSelectAll (is_selected) {
            this.selected_items_count = is_selected ? this.items_count : 0
            this.$emit('select-all', is_selected)
        },

        onSelectItem (params) {
            if (params.flag) {
                this.selected_items_count += 1
            } else {
                this.selected_items_count -= 1
            }
            this.$emit('select-item', params)
        }
    },

    computed: {
        items_count () {
            return Object.keys(this.table_data).length
        },

        is_all_items_unselected () {
            return this.selected_items_count === 0
        },

        is_all_items_selected () {
            return this.selected_items_count === this.items_count
        }
    }
}
</script>

<style lang='sass'>
.data-table
    &__body
        display: flex
        flex-direction: column
        background: $white-color
        padding: 10px
        border-radius: 10px
</style>

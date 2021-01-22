<template lang='pug'>
    .data-table
        transition(name="fade")
            .data-table__loader(v-show="is_loading")
                SpinnerLoader
        transition(name="fade")
            .data-table__content(v-show="!is_loading")
                .data-table__header
                    .header-actions(v-show="selected_items_count > 0")
                        .header-actions__action-item(
                            v-for="action_name, key in actions"
                            @click="emitCustomActionEvent(key)"
                        ) {{ action_name }}
                    DataTableHeader(
                        :fields="fields",
                        :actions="actions"
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
                        :default_pagination="default_pagination"
                        :total_items="total_items"
                        @paginate="onPaginate"
                    )
</template>

<script>
import SpinnerLoader from '@/components/common/SpinnerLoader.vue'
import DataTableHeader from './parts/DataTableHeader.vue'
import DataTableRow from './parts/DataTableRow.vue'
import DataTablePagination from './parts/DataTablePagination.vue'

export default {
    name: 'DataTable',

    components: {
        DataTableHeader,
        DataTableRow,
        DataTablePagination,
        SpinnerLoader
    },

    props: {
        fields: {
            type: Object,
            default: () => {}
        },
        table_data: {
            type: Object,
            default: () => {}
        },
        total_items: {
            type: Number,
            default: () => 0
        },
        default_pagination: {
            type: Object,
            required: true
        },
        actions: {
            type: Object,
            default: () => {}
        },
        is_loading: {
            type: Boolean,
            default: () => false
        }
    },

    data () {
        return {
            selected_items_count: null
        }
    },

    mounted () {
        this.onPaginate(this.default_pagination)
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
        },

        onPaginate ({ limit, offset }) {
            this.$emit('paginate', { limit, offset })
            this.onSelectAll(false)
        },

        emitCustomActionEvent (action) {
            this.$emit(action)
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
    position: relative
    &__loader
        position: absolute
        width: 100%
        min-height: 825px
        display: flex
        align-items: center
        justify-content: center
        background: $white-color
        border-radius: 10px
        z-index: 1

    &__content
        min-height: 825px
    &__body
        display: flex
        flex-direction: column
        background: $white-color
        padding: 10px
        border-radius: 10px
    .header-actions
        position: relative
        height: 59px
        display: flex
        align-items: center
        margin: 0 0 -59px 45px
        background: $white-color
        border-radius: 10px
        z-index: 1

        &__action-item
            margin: 0 10px
            cursor: pointer
            font-weight: 700
            color: $light-green-color
</style>

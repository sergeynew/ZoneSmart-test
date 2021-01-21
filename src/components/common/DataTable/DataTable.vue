<template lang='pug'>
    .data-table-component
        DataTableHeader(
            :fields="fields",
            :allItemsSelected="isAllItemsSelected"
            @select-all="onSelectAll",
        )
        .table-body
                DataTableRow(
                    v-for="rowData, id of tableData"
                    :key="id"
                    :fields="fields",
                    :rowData="rowData",
                    :allSelected="isAllItemsSelected",
                    :allUnselected="allUnselected"
                    @select-item="onSelectItem"
                )
</template>

<script>
import DataTableHeader from './parts/DataTableHeader.vue'
import DataTableRow from './parts/DataTableRow.vue'

export default {
    name: 'DataTable',

    components: {
        DataTableHeader,
        DataTableRow
    },

    props: {
        fields: {
            type: Object,
            default: () => {}
        },
        tableData: {
            type: Object,
            default: () => {}
        }
    },

    data () {
        return {
            selectedItemsCount: null
        }
    },

    methods: {
        onSelectAll (isSelected) {
            this.selectedItemsCount = isSelected ? this.itemsCount : 0
            this.$emit('select-all', isSelected)
        },

        onSelectItem (params) {
            if (params.flag) {
                this.selectedItemsCount += 1
            } else {
                this.selectedItemsCount -= 1
            }
            this.$emit('select-item', params)
        }
    },

    computed: {
        itemsCount () {
            return Object.keys(this.tableData).length
        },

        allUnselected () {
            return this.selectedItemsCount === 0
        },

        isAllItemsSelected () {
            return this.selectedItemsCount === this.itemsCount
        }
    }
}
</script>

<style lang='sass'>
    .table-body
        display: flex
        flex-direction: column
        background: $white-color
        padding: 10px
        border-radius: 10px
</style>

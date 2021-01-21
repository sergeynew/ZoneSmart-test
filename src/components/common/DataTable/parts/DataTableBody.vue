<template lang='pug'>
    .table-body
        .table-body__row(
            v-for="rowData, id of tableData"
        )
            DataTableCell.table-body__item(
                v-for="fieldValue, key in fields"
                :key="`${id} - ${key}`"
                v-if="!Array.isArray(rowData[key])"
                :data="rowData[key]"
                :fieldType="fieldValue.type"
                :style="{width: ceilDefaultWidth}"
            )
</template>

<script>

import DataTableCell from './DataTableCell.vue'

export default {
    name: 'DataTableBody',
    components: {
        DataTableCell
    },
    props: {
        fields: {
            type: Object,
            required: true,
            default: () => {}
        },
        tableData: {
            type: Object,
            required: true,
            default: () => {}
        }
    },

    computed: {
        ceilDefaultWidth () {
            const percents = 100 / Object.keys(this.fields).length
            return `${percents}%`
        }
    },

    methods: {}
}
</script>

<style lang='sass' scoped>
    .table-body
        display: flex
        flex-direction: column
        background: $white-color
        padding: 10px
        border-radius: 10px
        &__row
            display: flex
            justify-content: space-between
            align-items: center
            padding: 20px 0
        &__row:not(:last-of-type)
            border-bottom: 1px solid $gray-color
        &__item
            text-align: center
</style>

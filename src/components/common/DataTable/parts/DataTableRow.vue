<template lang='pug'>
    .table-body__row
        .table-body__item
            input.select-item(
                type="checkbox",
                v-model="rowSelected"
                @click="onItemSelect($event)"
            )
        DataTableCell.table-body__item(
            v-for="fieldValue, key in fields"
            v-if="!Array.isArray(rowData[key])"
            :key="`${key}`"
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
        rowData: {
            type: Object,
            required: true,
            default: () => {}
        },
        allSelected: {
            type: Boolean,
            default: () => false
        },
        allUnselected: {
            type: Boolean,
            default: () => true
        }
    },

    data () {
        return {
            rowSelected: false
        }
    },

    computed: {
        ceilDefaultWidth () {
            const percents = 100 / (Object.keys(this.fields).length + 1)
            return `${percents}%`
        }
    },

    methods: {
        onItemSelect ($event) {
            if (!this.rowData.id) {
                throw Error('row data must have "id" parametr')
            }
            const flag = $event.target.checked
            this.$emit('select-item', { flag, id: this.rowData.id })
        }
    },

    watch: {
        allSelected (value) {
            if (!this.rowSelected && value) {
                this.rowSelected = true
            }
        },

        allUnselected (value) {
            if (this.rowSelected && value) {
                this.rowSelected = false
            }
        }
    }
}
</script>

<style lang='sass' scoped>
    .table-body
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

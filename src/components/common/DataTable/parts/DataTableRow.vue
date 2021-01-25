<template lang='pug'>
    .data-table__row
        .data-table__cell
            input.styled-checkbox.styled-checkbox_default(
                type="checkbox"
                v-model="row_selected"
                :checked="all_selected"
                :class="{ 'checked': row_selected }"
                @click="onItemSelect($event)"
            )
        DataTableCell.table-body__cell(
            v-for="field_value, key in fields"
            :key="`${key}`"
            :data="row_data[key]"
            :field_type="field_value.type"
            :style="{ width: cell_default_widht }"
            @toggle-dropdown-row="toggleDropdownContent"
        )
        transition(name="dropdown")
            DataTableDropdownContent(
                v-if="is_dropdow_shown"
                :fields="dropdown_fields"
                :content="row_data['items']"
            )
</template>

<script>

import DataTableCell from './DataTableCell.vue'
import DataTableDropdownContent from './DataTableDropdownContent.vue'

export default {
    name: 'DataTableRow',

    components: {
        DataTableCell,
        DataTableDropdownContent
    },

    props: {
        fields: {
            type: Object,
            required: true
        },
        dropdown_fields: {
            type: Object,
            required: true
        },
        row_data: {
            type: Object,
            required: true
        },
        all_selected: {
            type: Boolean,
            default: () => false
        },
        all_unselected: {
            type: Boolean,
            default: () => true
        }
    },

    data () {
        return {
            row_selected: false,
            is_dropdow_shown: false
        }
    },

    computed: {
        cell_default_widht () {
            const percents = 100 / (Object.keys(this.fields).length + 1)
            return `${percents}%`
        }
    },

    methods: {
        onItemSelect ($event) {
            if (!this.row_data.id) {
                throw Error('row data must have "id" parametr')
            }
            const flag = $event.target.checked
            this.$emit('select-item', { flag, id: this.row_data.id })
        },

        toggleDropdownContent () {
            this.is_dropdow_shown = !this.is_dropdow_shown
        }
    },

    watch: {
        all_selected (value) {
            if (!this.row_selected && value) {
                this.row_selected = true
            }
        },

        all_unselected (value) {
            if (this.row_selected && value) {
                this.row_selected = false
            }
        }
    }
}
</script>

<style lang='sass' scoped>
    .data-table
        &__row
            display: flex
            justify-content: space-between
            flex-wrap: wrap
            align-items: center
            padding: 20px 0
            text-align: center
        &__row:not(:last-of-type)
            border-bottom: 1px solid $gray-color
        &__cell
            display: flex
            align-items: center
            justify-content: center
            max-height: 75px
</style>

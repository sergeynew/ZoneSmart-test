<template lang='pug'>
    .table-header
        .table-header__item
            input.mass-select(
                type="checkbox",
                :checked="all_selected",
                @click="onSelectAll($event)"
            )
        .table-header__item.data-item(
            v-for="field_value, key in fields"
            v-if="!Array.isArray(field_value)"
            :style="{ width: cell_default_width }"
        ) {{ field_value.title }}
</template>

<script>
export default {
    name: 'DataTableHeader',
    props: {
        fields: {
            type: Object,
            required: true,
            default: () => {}
        },
        all_selected: {
            type: Boolean,
            default: () => false
        }
    },

    methods: {
        onSelectAll ($event) {
            this.$emit('select-all', $event.target.checked)
        }
    },

    computed: {
        cell_default_width () {
            const percents = 100 / (Object.keys(this.fields).length + 1)
            return `${percents}%`
        }
    }
}
</script>

<style lang='sass' scoped>
.table-header
    display: flex
    justify-content: space-between
    padding: 20px 10px
    margin: 0 0 20px 0
    background: $white-color
    border-radius: 10px
    color: $gray-color
    &__item
        text-align: center
        vertical-align: center
</style>

<template lang='pug'>
    .table-header
        .table-header__item.data-item(
            v-for="fieldValue, key in fields"
            v-if="!Array.isArray(fieldValue)"
            :style="{ width: ceilDefaultWidth }"
        ) {{ fieldValue.title }}
</template>

<script>
export default {
    name: 'DataTableHeader',
    props: {
        fields: {
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

<template lang="pug">
    .dropdown-item(
        @click="toggleDropdown"
        :class=" { 'has-content': data.length }"
    ) + {{ cell_title }}
</template>

<script>
import { getEndingsForNumeral } from '@/utils/helpers'

export default {
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        // not re-usable need to refactor.
        cell_title () {
            const items_count = this.data.length
            const word = getEndingsForNumeral(items_count, ['товар', 'товара', 'товаров'])
            return `${items_count} ${word}`
        }
    },

    methods: {
        toggleDropdown () {
            this.$emit('toggle-dropdown-row')
        }
    }
}
</script>

<style lang="sass">
    .dropdown-item
        color: $gray-color
        font-weight: 600
        &.has-content
            cursor: pointer
            color: $light-green-color
</style>

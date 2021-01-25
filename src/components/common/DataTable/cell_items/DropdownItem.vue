<template lang="pug">
    .dropdown-item(
        @click="toggleDropdown"
        :class=" { 'has-content': data.length }"
    )
        span.sign(
            v-if="is_opened"
            v-html="'&#8593;'"
        )
        span.sign(v-else) +
        |  {{ cell_title }}
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

    data () {
        return {
            is_opened: false
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
            this.is_opened = !this.is_opened
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

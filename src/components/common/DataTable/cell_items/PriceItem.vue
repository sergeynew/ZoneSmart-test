<template lang="pug">
    .price-cell-item {{ formatted_price }}
</template>

<script>
import { formatPrice } from '@/utils/helpers'

export default {
    props: {
        data: {
            type: [Number],
            default: () => 0
        }
    },

    computed: {
        formatted_price () {
            return formatPrice(this.data)
        }
    }
}
</script>

<style>

</style>

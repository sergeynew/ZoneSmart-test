<template lang="pug">
    .price-cell-item {{ formattedPrice }}
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
        formattedPrice () {
            // used priceFormatter with default params.
            // We can easy implement currency and locale settings for application
            return formatPrice(this.data)
        }
    }
}
</script>

<style>

</style>

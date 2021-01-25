<template lang="pug">
    .date-time-item {{ formatted_time }}
</template>

<script>
import { dateToLocaleString } from '@/utils/helpers'

export default {
    props: {
        data: {
            type: String,
            default: () => ''
        }
    },

    computed: {
        formatted_time () {
            return dateToLocaleString(this.data)
        }
    }
}
</script>

<style>

</style>

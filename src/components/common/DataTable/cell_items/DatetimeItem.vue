<template lang="pug">
    .date-time-item {{ getFormattedTime() }}
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

    methods: {
        getFormattedTime () {
            return dateToLocaleString(this.data)
        }
    }
}
</script>

<style>

</style>

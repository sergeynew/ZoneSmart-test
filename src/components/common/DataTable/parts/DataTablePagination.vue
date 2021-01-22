<template lang="pug">
    .data-table__pagination pagination
</template>

<script>
export default {
    name: 'DataTablePagination',
    props: {
        paginationSettings: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            pagination: { ...this.paginationSettings }
        }
    }
}
</script>

<style lang="sass">

</style>

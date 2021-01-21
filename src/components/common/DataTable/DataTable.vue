<template lang='pug'>
    .data-table-component
        DataTableHeader(:fields="fields")
        DataTableBody(:fields="fields", :tableData="tableData")
</template>

<script>
import DataTableHeader from './parts/DataTableHeader.vue'
import DataTableBody from './parts/DataTableBody.vue'

export default {
    name: 'DataTable',
    components: {
        DataTableHeader,
        DataTableBody
    },
    props: {
        fields: {
            type: Object,
            default: () => {}
        },
        tableData: {
            type: Object,
            default: () => {}
        }
    },
    methods: {

    }
}
</script>

<style lang='sass'>
</style>

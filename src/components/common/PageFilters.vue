<template lang="pug">
    form.page-filters(@submit.prevent="submitFilters")
        .page-filters__submit
            button.btn.btn_dark.btn_uppercase(
                type="submit"
                @click="submitFilters"
            ) фильтр
        .page-filters__input.form-input
            input.form-input__control.form-control(
                v-model="filter_value"
                name="search"
                type="text"
                placeholder="Поиск"
            )
            i.icon.form-input__icon.search-icon
</template>

<script>
export default {
    name: 'PageFilters',

    data () {
        return {
            filter_value: ''
        }
    },

    methods: {
        submitFilters () {
            this.$emit('filter-applied', this.filter_value)
        }
    }
}
</script>

<style lang="sass" scoped>
    .page-filters
        display: flex
        align-items: center
        margin: 0 auto 20px auto
        &__submit
            margin: 0 20px 0 0
        &__input
            width: 100%
            input
                width: 100%
                height: 45px
</style>

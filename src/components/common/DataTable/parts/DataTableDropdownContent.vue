<template lang="pug">
    .dropdown-row
        .dropdown-row__content
            .dropdown-row__header
                .header-item(
                    v-for="field in fields"
                    :style="{ width: cell_default_width }"
                ) {{ field.title }}
            .dropdown-row__content-table
                .content_table__row(
                    v-for="item, id in content"
                    :key="id"
                )
                    .content_table__cell(
                        v-for="title, key in fields"
                        :key="key"
                        :style="{ width: cell_default_width }"
                    )
                        .item-image(
                            v-if="key === 'image'"
                            :style="{ backgroundImage: `url(${item[key]})` }"
                            :class="{ 'no-found': !item[key]}"
                        )
                        span.item-text(v-else) {{ item[key] }}

</template>

<script>
export default {
    props: {
        fields: {
            type: Object,
            requered: true
        },
        content: {
            type: Array,
            requered: true
        }
    },

    computed: {
        cell_default_width () {
            const percents = 100 / (Object.keys(this.fields).length)
            return `${percents}%`
        }
    }
}
</script>

<style lang="sass">
.dropdown-row
    flex-basis: 100%
    margin: 0 auto
    padding: 20px 20px 0 20px
    &__content
        width: 100%
        background: $base-bg-color
        padding: 15px 25px
    &__header
        display: flex
        margin: 0 15px
        color: $gray-color
    &__content-table
        display: flex
        flex-direction: column
        margin: 20px 0
        background: $white-color
    .content_table
        &__row
            display: flex
            align-items: center
            padding: 15px 0
            margin: 0 15px
        &__row:not(:first-of-type)
            margin-top: 10px
        &__row:not(:last-of-type)
            border-bottom: 1px solid $gray-color
        &__cell
            .item-image
                height: 50px
                width: 50px
                margin: 0 auto
                background-color: $base-bg-color
                background-position: center
                background-repeat: no-repeat
                background-size: cover
                &.no-found
                    display: flex
                    align-items: center
                    justify-content: center
                    &:after
                        content: '?'
                        color: $gray-color
</style>

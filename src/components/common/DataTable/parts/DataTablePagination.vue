<template lang="pug">
    .data-table__pagination-container
        .data-table__pagination.pagination(v-show="total_items")
            .pagination__prev(
                @click="toPrevPage",
                :class="{ 'disabled': disabled_buttons.prev }"
            )
            .pagination__info {{ pagination_info }}
            .pagination__next(
                @click="toNextPage"
                :class="{ 'disabled': disabled_buttons.next }"
            )
</template>

<script>
export default {
    name: 'DataTablePagination',

    props: {
        default_pagination: {
            type: Object,
            required: true
        },
        total_items: {
            type: Number,
            default: () => 0
        },
        is_loading: {
            type: Boolean,
            default: () => false
        }
    },

    data () {
        return {
            pagination: {
                ...this.default_pagination,
                next_offset: this.default_pagination.limit
            },
            disabled_buttons: {
                next: false,
                prev: true
            }
        }
    },

    computed: {
        pagination_info () {
            return `${this.pagination.offset + 1} - ${this.pagination.next_offset} из ${this.total_items}`
        }
    },

    methods: {
        toNextPage () {
            if (!this.is_loading) {
                this.disabled_buttons.prev = false
                if (!this.disabled_buttons.next) {
                    this.pagination.offset += this.pagination.limit
                    this.pagination.next_offset = this.pagination.offset + this.pagination.limit
                    if (this.pagination.next_offset > this.total_items) {
                        this.disabled_buttons.next = true
                        this.pagination.next_offset = this.total_items
                    }
                    this.emitPaginate()
                }
            }
        },

        toPrevPage () {
            if (!this.is_loading) {
                this.disabled_buttons.next = false
                if (!this.disabled_buttons.prev) {
                    this.pagination.next_offset = this.pagination.offset
                    this.pagination.offset -= this.pagination.limit
                    if (this.pagination.offset === 0) {
                        this.disabled_buttons.prev = true
                    } else {
                        this.emitPaginate()
                    }
                }
            }
        },

        emitPaginate () {
            this.$emit('paginate', this.pagination)
        }
    },

    watch: {
        total_items (total_items) {
            this.pagination.offset = 0
            this.pagination.next_offset = this.pagination.limit
            if (this.pagination.limit >= total_items) {
                this.pagination.next_offset = total_items
                this.disabled_buttons.next = true
            } else {
                this.disabled_buttons.next = false
                this.pagination.next_offset = this.pagination.limit
            }
        }
    }
}
</script>

<style lang="sass" scoped>
    .data-table
        &__pagination-container
            display: flex
            justify-content: flex-end
            margin: 20px 0
        &__pagination
            display: flex
            align-items: center

    .pagination
        color: $gray-color
        font-size: 16px
        &__prev,
        &__next
            cursor: pointer
            &.disabled
                cursor: default
            &:after
                font-size: 20px
                font-weight: bold
        &__prev::after
            content: '\2190'
        &__next::after
            content: '\2192'
        &__info
            margin: 0 5px
            text-align: center
            min-width: 110px
            cursor: default
</style>

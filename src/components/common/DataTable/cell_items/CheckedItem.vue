<template lang="pug">
    .styled-checkbox.styled-checkbox_rounded(
        :class="{ 'checked': data }"
    )
</template>

<script>
export default {
    props: {
        data: {
            type: Boolean,
            default: () => false
        }
    }
}
</script>

<style>

</style>

<template lang="pug">
    .styled-checkbox(
        :class="{ 'styled-checkbox_checked': data }"
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

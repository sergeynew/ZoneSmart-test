<template lang="pug">
    .text-item {{ data }}
</template>

<script>
export default {
    props: {
        data: {
            type: [String, Number],
            default: () => 'no info'
        }
    }
}
</script>

<style>

</style>

<script setup lang="ts" name="ScreenFit">
defineOptions({
    name: "ScreenFit"
})

const props = defineProps({
    bg: {
        type: String,
        default: ''
    },
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>

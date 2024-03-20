<script setup lang="ts" name="ScreenFit">
import { EFillType } from '@double_ming/screen-fit';
import { PropType } from 'vue';

defineOptions({
    name: "ScreenFit"
})

const props = defineProps({
   fillType: {
      type: Number as PropType<EFillType>,
      default: EFillType.contain
   } 
})

</script>

<template>
  <div ref="screenWrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>

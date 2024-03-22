<script setup lang="ts" name="ScreenFit">
import screenFit, { EFillType, IScreenOptions } from '@double_ming/screen-fit';
import { watch, onMounted, ref } from 'vue';

defineOptions({
    name: "ScreenFit"
})

const props = withDefaults(defineProps<IScreenOptions>(), {
  fitType: EFillType.contain
}) 

const screenDom = ref<HTMLDivElement|null>()

let fitObj: ReturnType<typeof screenFit>

function handleResize(fitType: EFillType) {
  if (fitObj) {
    fitObj.resize({
      fitType: fitType || props.fitType
    })
  }
}

watch(() => props.fitType, (fitType) => {
  handleResize(fitType)
})


defineExpose({
  handleResize
})


onMounted(() => {
   if (!screenDom.value) {
    console.warn('大屏尚未挂载')
    return
   }
   fitObj = screenFit(screenDom.value!, {
       fitType: props.fitType,
       designWidth: props.designWidth,
       designHeight: props.designHeight,
   })
})

</script>

<template>
  <div ref="screenDom">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>

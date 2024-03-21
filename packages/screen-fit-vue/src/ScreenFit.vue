<script setup lang="ts" name="ScreenFit">
import screenFit, { EFillType, IScreenOptions } from '@double_ming/screen-fit';
import { watch, onMounted, ref } from 'vue';

defineOptions({
    name: "ScreenFit"
})

const props = defineProps<IScreenOptions>()

const screenDom = ref<HTMLDivElement|null>()

let resize: (opt: IScreenOptions) => void

watch(() => props.fitType, (fitType) => {
  console.log(fitType)
  resize({fitType})
})


onMounted(() => {
   if (!screenDom.value) {
    console.warn('大屏尚未挂载')
    return
   }
    const fitObj = screenFit(screenDom.value!, {
        fitType: props.fitType,
        referenceDom: props.referenceDom,
        referenceParent: props.referenceParent || true,
        designWidth: props.designWidth,
        designHeight: props.designHeight,
    })
    resize = fitObj.resize
})

</script>

<template>
  <div ref="screenDom">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
</style>

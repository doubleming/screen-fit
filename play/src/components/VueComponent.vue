<script setup lang="ts" name="VueComponent">
import ScreenFit from '@double_ming/screen-fit-vue';
import bg from '../assets/1.jpg'
import { EFillType } from '@double_ming/screen-fit';
import { ref } from 'vue';
const coverType = ref<EFillType>(EFillType.contain)
function action(type: EFillType) {
  coverType.value = type
}
</script>

<template>
  <div>
      <ScreenFit >
        <div :style="{ backgroundImage: `url(${bg})` }"></div>
      </ScreenFit>
    <div class="action">
      <span class="action-text">适配模式：</span>
      <button id="cover" @click="action(EFillType.cover)">cover</button>
      <button id="widthFit" @click="action(EFillType.widthFit)">widthFit</button>
      <button id="heightFit" @click="action(EFillType.heightFit)">heightFit</button>
      <button id="contain" @click="action(EFillType.contain)">contain</button>
      <button id="fill" @click="action(EFillType.fill)">fill</button>
      <div class="action-info">
        <span>鼠标放红框处，拖动查看适配效果</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action {
    position: fixed;
    z-index: 99999999;
    left: 0;
    background-color: #1a1a1a;

    &-text {
        padding: 0.6em 1.2em;
    }

    &-info {
        padding: 0.6em 1.2em;
        text-align: left;
        font-size: 20px;
        color: red;
    }

    button {
        width: 100px;
    }
}
</style>

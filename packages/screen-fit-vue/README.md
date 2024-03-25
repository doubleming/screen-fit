 <h2 style="text-align: center;"> 大屏只适应适配 </h2>

## 安装
```sh
# npm 
npm install @double_ming/screen-fit-vue
# yarn 
yarn add @double_ming/screen-fit-vue
# pnpm
pnpm add @double_ming/screen-fit-vue
```
## demo
[预览效果](https://doubleming.github.io/screen-fit/)

## 使用
```vue
<script setup lang="ts" name="VueComponent">
import ScreenFit from '@double_ming/screen-fit-vue';
import bg from '../assets/1.jpg'
import { EFillType } from '@double_ming/screen-fit';
import { onMounted, ref, watch, reactive } from 'vue';

const fitType = ref<EFillType>(EFillType.contain)
function action(type: EFillType) {
  fitType.value = type
}
</script>

<template>
  <div>
      <ScreenFit :design-height="1080" :design-width="1920" :fit-type="fitType" style="height: 100vh">
        <div :style="{ backgroundImage: `url(${bg})`, width: '1800px', height: '1000px', objectFit: 'cover' }"></div>
      </ScreenFit>
    <div class="action">
      <span class="action-text">适配模式：</span>
      <button id="cover" @click="action(EFillType.cover)">cover</button>
      <button id="widthFit" @click="action(EFillType.widthFit)">widthFit</button>
      <button id="heightFit" @click="action(EFillType.heightFit)">heightFit</button>
      <button id="contain" @click="action(EFillType.contain)">contain</button>
      <button id="fill" @click="action(EFillType.fill)">fill</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action {
  position: fixed;
  z-index: 99999999;
  left: 0;
  top: 0;
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

```
## 适配方式
> 提供了5中适配方式，分别为`EFillType`枚举中的`cover`、`widthFit`、`heightFit`、`contain`、`fill`、
- `cover` 等比缩放，占满整个容器
- `widthFit` 宽度占满容器，高等比缩放
- `heightFit` 高度占满容器，宽等比缩放
- `contain` 宽或高等比缩放，满足最大占满容器 默认
- `fill` 宽和高填充整个容器，不进行等比缩放


## 本项目是对screen-fit的vue封装，props支持screen-fit所有的配置
## props配置参数
| 属性 | 描述   | 类型   | 默认值  | 
| --- | --- | --- | --- |
| designWidth | 设计稿宽  | number   | 1920 |
| designHeight | 设计稿高  | number   | 1080 |
| fitType | 适配方式 | EFillType   | contain |
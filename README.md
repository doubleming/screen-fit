<h2 style="text-align: center;"> 大屏只适应适配 </h2>

-  [查看vue封装组件详文档](packages/screen-fit-vue/README.md)

## 安装
```sh
# npm 
npm install @double_ming/screen-fit
# yarn 
yarn add @double_ming/screen-fit
# pnpm
pnpm add @double_ming/screen-fit
```
## demo
[预览效果](https://doubleming.github.io/screen-fit/)
## 使用
```ts
import screenFit, { EFillType, IScreenOptions } from '@double_ming/screen-fit'
// screenDom 为大屏根元素
const screenDom = document.querySelector<HTMLDivElement>("#screen")
const fitObj = screenFit(screenDom!, {
    fitType: EFillType.contain,
})
```
```html
<div id="screen" style="width: 1920px; height:1080px">
    <div :style="{ backgroundImage: `url(${bg})`, width: '1920px', height: '1080px' }"></div>
</div>
```
## 适配方式
> 提供了5中适配方式，分别为`EFillType`枚举中的`cover`、`widthFit`、`heightFit`、`contain`、`fill`、
- `cover` 等比缩放，占满整个容器
- `widthFit` 宽度占满容器，高等比缩放
- `heightFit` 高度占满容器，宽等比缩放
- `contain` 宽或高等比缩放，满足最大占满容器 默认
- `fill` 宽和高填充整个容器，不进行等比缩放

## screenFit 方法

```ts
// element 为根元素元素或者根元素的id
// options配置参数如下
const fitObj = screenFit(elementOrId, options)
// fitObj有包含{resize， stopListener}
// 可以再次更改适配方式
fitObj.resize(option: IScreenOptions)
```


## options配置参数
| 属性 | 描述   | 类型   | 默认值  | 
| --- | --- | --- | --- |
| designWidth | 设计稿宽  | number   | 1920 |
| designHeight | 设计稿高  | number   | 1080 |
| fitType | 适配方式 | EFillType   | contain |
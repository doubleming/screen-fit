// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ScreenFit: typeof import('../packages/screen-fit-vue/src')['ScreenFit']
  }

}

export {}

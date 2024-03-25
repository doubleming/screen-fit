import type { vShow } from 'vue'

declare global {
  const process: {
    env: {
      NODE_ENV: string
    }
  }

}

declare module '@vue/runtime-core' {
  export interface App {
  }

  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }

  export interface ComponentCustomProperties {
    vShow: typeof vShow
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export {}

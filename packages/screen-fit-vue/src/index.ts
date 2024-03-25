import { App, Plugin } from 'vue'
import ScreenFitVue from './ScreenFit.vue'

type SFCWithInstall<T> = T & Plugin


const withInstall = <T>(
  comp: T,
) => {
  (comp as SFCWithInstall<T>).install = (app: App): void => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      app.component((comp as any).name, comp)
  }
  return comp as SFCWithInstall<T> 
}

const ScreenFit = withInstall(ScreenFitVue)



export default ScreenFit
export { ScreenFit }

export type ScreenFitInstance = InstanceType<typeof ScreenFit>
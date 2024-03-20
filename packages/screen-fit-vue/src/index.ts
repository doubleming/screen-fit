import { App } from 'vue'
import ScreenFit from './ScreenFit.vue'

ScreenFit.install = (app: App) => {
    app.component(ScreenFit.name, ScreenFit)
}

export default ScreenFit
export { ScreenFit }

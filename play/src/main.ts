import './style.css'
import screenFit, { EFillType } from '@double_ming/screen-fit'
import bg from './assets/1.jpg'
const screenDom = document.querySelector<HTMLDivElement>("#screen")
const cover = document.querySelector<HTMLDivElement>("#cover")
const widthFit = document.querySelector<HTMLDivElement>("#widthFit")
const heightFit = document.querySelector<HTMLDivElement>("#heightFit")
const contain = document.querySelector<HTMLDivElement>("#contain")
const fill = document.querySelector<HTMLDivElement>("#fill")
import Resize from './resize'

screenDom.style.backgroundImage = `url(${bg})`

new Resize(screenDom.parentNode as HTMLDivElement)

const {resize} = screenFit(screenDom!, {
    fitType: EFillType.contain,
    referenceParent: true
})


function action(type: EFillType) {
    resize({
        fitType: type
    })
}

cover.addEventListener('click', () => action(EFillType.cover))
widthFit.addEventListener('click', () => action(EFillType.widthFit))
heightFit.addEventListener('click', () => action(EFillType.heightFit))
contain.addEventListener('click', () => action(EFillType.contain))
fill.addEventListener('click', () => action(EFillType.fill))




export interface IScreenOptions {
    designWidth?: number,
    designHeight?: number
}

const defaultOptions: IScreenOptions = {
    designHeight: 1080,
    designWidth: 1920
}


export function screenFit(root: HTMLDivElement | string, options: IScreenOptions ={}) {
    options = {...options, ...defaultOptions}
    if (typeof root === 'string') {
        root = document.querySelector<HTMLDivElement>(root)
    }
    if (!(root instanceof HTMLElement)) {
        console.error(`${root}不是element元素，或者css选择器不存在`)
        return
    }
    wrapperRoot(root)
    function resize() {
        transformRoot(root as HTMLDivElement, options)
    }
    window.addEventListener('resize', resize)
    resize()
}


export default screenFit



function wrapperRoot(root: HTMLDivElement) {
    const parent = root.parentNode
    const wrapper = document.createElement("div")
    wrapper.style.overflow = 'hidden'
    wrapper.style.height = '100vh'
    wrapper.style.width = '100vw'
    parent.removeChild(root)
    wrapper.appendChild(root)
    parent.appendChild(wrapper)
}

function transformRoot(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    let scaleY = 1
    let scaleX = 1
    const { innerHeight, innerWidth } = window
    const rate = designWidth / designHeight
    const windowRete = innerWidth / innerHeight
    if (windowRete > rate) {
        scaleY = innerHeight / designHeight
        scaleX = (innerHeight * rate) / designWidth
    } else {
        scaleX = innerWidth / designWidth
        scaleY = (innerWidth / rate) / designHeight
    }
    const getTrans = (input: number, out: number, rete: number) => (input - out) / (2 * rete)
    const transform = `scale(${scaleX}, ${scaleY}) translateX(${getTrans(innerWidth, designWidth, scaleX)}px) translateY(${getTrans(innerHeight, designHeight, scaleY)}px)`
    root.style.height = `${designHeight}px`
    root.style.width  = `${designWidth}px`
    root.style.transform = transform
}
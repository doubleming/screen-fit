
export enum EFillType {
    cover, // 等比缩放，占满整个容器
    widthFit, // 宽度占满容器，高等比缩放
    heightFit, // 高度占满容器，宽等比缩放
    contain, // 宽或高等比缩放，满足最大占满容器 默认
    fill, // 宽和高填充整个容器，不进行等比缩放
}
export interface IScreenOptions {
    designWidth?: number,  // 设计稿的宽 默认 1920
    designHeight?: number  // 设计稿的高 默认 1080
    fitType?: EFillType  //适配方式 默认 contain
}

const defaultOptions: IScreenOptions = {
    designHeight: 1080,
    designWidth: 1920,
    fitType: EFillType.contain
}

export function screenFit(root: HTMLDivElement | string, options: IScreenOptions = {}) {
    options = customMerge(defaultOptions, options)
    if (typeof root === 'string') {
        root = document.querySelector<HTMLDivElement>(root)
    }
    if (!(root instanceof HTMLElement)) {
        console.error(`${root}不是element元素，或者css选择器不存在`)
        return
    }
    wrapperRoot(root)
    function resize(opt: IScreenOptions = {}) {
        options = customMerge(options, opt)
        transformRoot(root as HTMLDivElement, options)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ob = new ResizeObserver(() => resize())
    ob.observe(root)
    function stopListener() {
        ob.unobserve((root as HTMLDivElement))
    }
    return { resize, stopListener }
}


export default screenFit

function getContainerSize(root: HTMLDivElement) {
    const { clientWidth: containerWidth, clientHeight: containerHeight } = root
    return {
        containerWidth,
        containerHeight
    }
}

function wrapperRoot(root: HTMLDivElement) {
    const wrapper = document.createElement("div");
    const fragment = document.createDocumentFragment()
    while(root.firstChild) {
        fragment.append(root.firstChild)
    }
    wrapper.append(fragment)
    root.append(wrapper)
    root.style.position= 'relative'
    root.style.overflow = 'hidden'
    wrapper.style.position = 'absolute'
}

function getWrapper(root: HTMLDivElement) {
    return root.firstChild as HTMLDivElement
}

function transformRoot(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    const wrapper = getWrapper(root)
    wrapper.style.height = `${designHeight}px`
    wrapper.style.width = `${designWidth}px`
    calculateScale(root, options)
}

function calculateScale(root: HTMLDivElement, options: IScreenOptions) {
    const { fitType } = options as Required<IScreenOptions>
    const transformMap: Record<EFillType, (root: HTMLDivElement, options: IScreenOptions) => void> = {
        [EFillType.cover]: coverTransform,
        [EFillType.widthFit]: widthFitTransform,
        [EFillType.heightFit]: heightFItTransform,
        [EFillType.contain]: containTransform,
        [EFillType.fill]: fillTransform
    }
    return transformMap[fitType](root, options)
}

function coverTransform(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    const { containerHeight, containerWidth } = getContainerSize(root)
    let scaleY = 1
    let scaleX = 1
    const rate = designWidth / designHeight
    const containerRete = containerWidth / containerHeight
    if (containerRete > rate) {
        scaleX = containerWidth / designWidth
        scaleY = (containerWidth / rate) / designHeight
    } else {
        scaleY = containerHeight / designHeight
        scaleX = (containerHeight * rate) / designWidth
    }
    const getTrans = (input: number, out: number, rete: number) => (input - out) / (2 * rete)
    const wrapper = getWrapper(root)
    wrapper.style.transform = `scale(${scaleX}, ${scaleY}) translateX(${getTrans(containerWidth, designWidth, scaleX)}px) translateY(${getTrans(containerHeight, designHeight, scaleY)}px)`
    wrapper.style.transformOrigin = null
}



function widthFitTransform(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    const { containerWidth, containerHeight } = getContainerSize(root)
    let scaleY = 1
    let scaleX = 1
    const rate = designWidth / designHeight
    scaleX = containerWidth / designWidth
    scaleY = (containerWidth / rate) / designHeight
    const getTrans = (input: number, out: number, rete: number) => (input - out) / (2 * rete)
    const wrapper = getWrapper(root)
    wrapper.style.transform = `scale(${scaleX}, ${scaleY}) translateX(${getTrans(containerWidth, designWidth, scaleX)}px) translateY(${getTrans(containerHeight, designHeight, scaleY)}px)`
    wrapper.style.transformOrigin = null
}

function heightFItTransform(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    const { containerHeight, containerWidth } = getContainerSize(root)
    let scaleY = 1
    let scaleX = 1
    const rate = designWidth / designHeight
    scaleY = containerHeight / designHeight
    scaleX = (containerHeight * rate) / designWidth
    const getTrans = (input: number, out: number, rete: number) => (input - out) / (2 * rete)
    const wrapper = getWrapper(root)
    wrapper.style.transform = `scale(${scaleX}, ${scaleY}) translateX(${getTrans(containerWidth, designWidth, scaleX)}px) translateY(${getTrans(containerHeight, designHeight, scaleY)}px)`
    wrapper.style.transformOrigin = null
}

function fillTransform(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    const { containerHeight, containerWidth } = getContainerSize(root)
    const scaleY = containerHeight / designHeight
    const scaleX = containerWidth / designWidth
    const wrapper = getWrapper(root)
    wrapper.style.transform = `scale(${scaleX}, ${scaleY})`
    wrapper.style.transformOrigin = '0 0'
}

function containTransform(root: HTMLDivElement, options: IScreenOptions) {
    const { designHeight, designWidth } = options as Required<IScreenOptions>
    const { containerHeight, containerWidth } = getContainerSize(root)
    let scaleY = 1
    let scaleX = 1
    const rate = designWidth / designHeight
    const containerRete = containerWidth / containerHeight
    if (containerRete > rate) {
        scaleY = containerHeight / designHeight
        scaleX = (containerHeight * rate) / designWidth
    } else {
        scaleX = containerWidth / designWidth
        scaleY = (containerWidth / rate) / designHeight
    }
    const getTrans = (input: number, out: number, rete: number) => (input - out) / (2 * rete)
    const wrapper = getWrapper(root)
    wrapper.style.transform = `scale(${scaleX}, ${scaleY}) translateX(${getTrans(containerWidth, designWidth, scaleX)}px) translateY(${getTrans(containerHeight, designHeight, scaleY)}px)`
    wrapper.style.transformOrigin = null
}


function customMerge(defaultOpt: IScreenOptions, opt: IScreenOptions): IScreenOptions {
    const newOpt: IScreenOptions = {}
    Object.keys(defaultOpt).forEach(key => {
        const k = key as keyof IScreenOptions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newOpt as any)[k] = opt[k] ?? defaultOpt[k]
    })
    return newOpt
}
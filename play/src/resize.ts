export class Resize {
    constructor(public el: HTMLElement, public option = {}) {
        this.init();
    }

    init = () => {
        this.el.style.position = 'relative'

        const rightBottomEl = document.createElement("div");
        rightBottomEl.style.cssText = "border-right: 1px dashed red;border-bottom: 1px dashed red;position: absolute;height: 10px;width: 10px;bottom: 0px;right: 0px;cursor: se-resize;z-index:9999;"
        const leftBottomEl = document.createElement("div");
        leftBottomEl.style.cssText = "border-left: 1px dashed red;border-bottom: 1px dashed red;position: absolute;height: 10px;width: 10px;bottom: 0px;left: 0px;cursor: sw-resize;z-index:9999;"
        const rightTopEl = document.createElement("div");
        rightTopEl.style.cssText = "border-right: 1px dashed red;border-top: 1px dashed red;position: absolute;height: 10px;width: 10px;top: 0px;right: 0px;cursor: ne-resize;z-index:9999;"
        const leftTopEl = document.createElement("div");
        leftTopEl.style.cssText = "border-left: 1px dashed red;border-top: 1px dashed red;position: absolute;height: 10px;width: 10px;top: 0px;left: 0px;cursor: nw-resize;z-index:9999;"


        const rightEl = document.createElement("div");
        rightEl.style.cssText = "border-right: 1px dashed red;position: absolute;width:10px;top:10px;bottom:10px;right: 0px;cursor: e-resize;z-index:9999;"
        const leftEl = document.createElement("div");
        leftEl.style.cssText = "border-left: 1px dashed red;position: absolute;width:10px;top:10px;bottom: 10px;left: 0px;cursor: e-resize;z-index:9999;"
        const bottomEl = document.createElement("div");
        bottomEl.style.cssText = "border-bottom: 1px dashed red;position: absolute;bottom:0;right:10px;left: 10px;height: 10px;cursor: n-resize;z-index:9999;"
        const topEl = document.createElement("div");
        topEl.style.cssText = "border-top: 1px dashed red;position: absolute;top:0;right:10px;left: 10px;height: 10px;cursor: n-resize;z-index:9999;"
        this.el.appendChild(rightTopEl);
        this.el.appendChild(leftTopEl);
        this.el.appendChild(rightBottomEl);
        this.el.appendChild(leftBottomEl);
        this.el.appendChild(rightEl);
        this.el.appendChild(leftEl);
        this.el.appendChild(bottomEl);
        this.el.appendChild(topEl);


        // 添加鼠标点击事件
        rightEl.addEventListener("mousedown", this.onRightMousedown); // 右
        rightTopEl.addEventListener("mousedown", this.onRightTopMousedown); // 右上
        rightBottomEl.addEventListener("mousedown", this.onRightBottomMousedown); // 右下
        leftEl.addEventListener("mousedown", this.onLeftMousedown); // 左
        leftTopEl.addEventListener("mousedown", this.onLeftTopMousedown); // 左上
        leftBottomEl.addEventListener("mousedown", this.onLeftBottomMousedown); // 左下
        topEl.addEventListener("mousedown", this.onTopMousedown); // 上
        bottomEl.addEventListener("mousedown", this.onBottomMousedown); // 下
    }
    // 右点击
    onRightMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = e.clientX - rect.left;
                const height = rect.height;
                const left = rect.left;
                const top = rect.top;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
    // 右上点击
    onRightTopMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = e.clientX - rect.left;
                const height = rect.height + (rect.top - e.clientY);
                const left = rect.left;
                const top = e.clientY;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
    // 右下点击
    onRightBottomMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = e.clientX - rect.left;
                const height = e.clientY - rect.top;
                const left = rect.left;
                const top = rect.top;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
    // 左点击
    onLeftMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = rect.width + (rect.left - e.clientX);
                const height = rect.height;
                const left = e.clientX;
                const top = rect.top;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
    // 左上点击
    onLeftTopMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = rect.width + (rect.left - e.clientX);
                const height = rect.height + (rect.top - e.clientY);
                const left = e.clientX;
                const top = e.clientY;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
    // 左下点击
    onLeftBottomMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = rect.width + (rect.left - e.clientX);
                const height = e.clientY - rect.top;
                const left = e.clientX;
                const top = rect.top;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }


    // 上点击
    onTopMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = rect.width;
                const height = rect.height + (rect.top - e.clientY);
                const left = rect.left;
                const top = e.clientY;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
    // 下点击
    onBottomMousedown = (e: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        e.preventDefault();
        let isMove = true;
        window.addEventListener('mousemove', (e) => {
            if (isMove) {
                const width = rect.width;
                const height = e.clientY - rect.top;
                const left = rect.left;
                const top = rect.top;
                this.el?.setAttribute(
                    'style',
                    `position:relative;width:${width}px;height:${height}px;`
                );
            }
        });
        window.addEventListener('mouseup', () => {
            setTimeout(() => {
                isMove = false;
            }, 100);
        });
    }
}
export default Resize
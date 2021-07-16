/**
 * 独立可复用的逻辑， 点击获取鼠标坐标
*/
import { onMounted, onUnmounted, ref } from 'vue'
function useMousePos() {
    const x = ref(0)
    const y = ref(0)
    const event = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }
    onMounted(function () {
        document.addEventListener('click', event)
    })

    onUnmounted(function () {
        document.removeEventListener('click', event)
    })
    return { x, y }
}

export default useMousePos
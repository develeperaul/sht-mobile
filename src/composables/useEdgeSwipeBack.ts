import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default function useEdgeSwipeBack() {
  const router = useRouter()

  let startX = 0
  let startY = 0
  let isActive = false
  let historyCount = 0

  const SWIPE_THRESHOLD = 40
  const BOTTOM_SAFE = 50

  const unsubscribe = router.beforeEach((to, from) => {
    if (from.name) historyCount++
  })

  function isScrollableHorizontally(el: HTMLElement | null): boolean {
    if (!el) return false
    const style = getComputedStyle(el)
    const overflow = style.overflow + style.overflowX
    const scrollable = overflow.includes('auto') || overflow.includes('scroll')
    return scrollable && el.scrollWidth > el.clientWidth
  }

  function onTouchStart(e: TouchEvent) {
    const touch = e.touches[0]

    if (touch.clientY > window.innerHeight - BOTTOM_SAFE) return
    if (historyCount <= 0) return

    const target = e.target as HTMLElement
    if (target.closest('.swiper')) return

    let el: HTMLElement | null = target
    while (el) {
      if (isScrollableHorizontally(el)) return
      el = el.parentElement
    }

    startX = touch.clientX
    startY = touch.clientY
    isActive = true
  }

  function onTouchMove(e: TouchEvent) {
    if (!isActive) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      isActive = false
      return
    }

    if (deltaX > 0) {
      e.preventDefault()
    }
  }

  function onTouchEnd(e: TouchEvent) {
    if (!isActive) return
    isActive = false

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - startX

    if (deltaX >= SWIPE_THRESHOLD) {
      router.back()
    }
  }

  onMounted(() => {
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)
  })

  onUnmounted(() => {
    document.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
    unsubscribe()
  })
}

// v-fit-text.ts
import { DirectiveBinding, nextTick } from 'vue'

type FitOptions = {
  min?: number // минимальный размер шрифта (px)
  max?: number // максимальный размер шрифта (px)
  lineHeight?: number | 'normal' // во сколько раз больше font-size
  precision?: number // точность бинарного поиска (px)
}

const defaultOpts: Required<Omit<FitOptions, 'lineHeight'>> & {
  lineHeight: number | 'normal'
} = {
  min: 10,
  max: 64,
  lineHeight: 'normal',
  precision: 0.5,
}

function fits(el: HTMLElement): boolean {
  // Влезает по ширине и высоте
  return el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight
}

function applySize(el: HTMLElement, size: number, lh: number | 'normal') {
  el.style.fontSize = `${size}px`
  if (lh === 'normal') {
    el.style.lineHeight = ''
  } else {
    el.style.lineHeight = `${size * lh}px`
  }
}

async function fit(el: HTMLElement, opts: FitOptions = {}) {
  const { min, max, precision, lineHeight } = { ...defaultOpts, ...opts }

  if (el.clientWidth === 0 || el.clientHeight === 0) {
    // Элемент скрыт (display:none) — попробуем на следующем кадре
    await nextTick()
    if (el.clientWidth === 0 || el.clientHeight === 0) return
  }

  // Сначала пробуем максимальный
  applySize(el, max, lineHeight)
  if (fits(el)) return

  // Если даже минимальный не влезает — ставим минимальный и выходим
  applySize(el, min, lineHeight)
  if (!fits(el)) return

  // Бинарный поиск максимального подходящего размера
  let lo = min,
    hi = max
  while (hi - lo > precision) {
    const mid = (lo + hi) / 2
    applySize(el, mid, lineHeight)
    if (fits(el)) lo = mid
    else hi = mid
  }
  applySize(el, lo, lineHeight)
}

type ElState = {
  resizeObs?: ResizeObserver
  mutationObs?: MutationObserver
  opts: FitOptions
}

function setup(el: HTMLElement, binding: DirectiveBinding<FitOptions>) {
  const state: ElState = {
    opts: binding.value || {},
  }
  ;(el as any).__fitText = state

  // Наблюдаем за размером контейнера
  state.resizeObs = new ResizeObserver(() => fit(el, state.opts))
  state.resizeObs.observe(el)

  // Наблюдаем за изменениями текста
  state.mutationObs = new MutationObserver(() => fit(el, state.opts))
  state.mutationObs.observe(el, {
    childList: true,
    subtree: true,
    characterData: true,
  })

  // Первичный расчёт
  requestAnimationFrame(() => fit(el, state.opts))
}

export default {
  mounted: setup,
  updated(el: HTMLElement, binding: DirectiveBinding<FitOptions>) {
    const state: ElState = (el as any).__fitText
    state.opts = binding.value || {}
    fit(el, state.opts)
  },
  unmounted(el: HTMLElement) {
    const state: ElState | undefined = (el as any).__fitText
    state?.resizeObs?.disconnect()
    state?.mutationObs?.disconnect()
    delete (el as any).__fitText
  },
}

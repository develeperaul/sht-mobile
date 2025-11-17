import 'virtual:svg-icons-register'
import { vMaska } from 'maska/vue'
import 'dayjs/locale/ru'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// import ru from 'dayjs/locale/ru'
export default async ({ app }) => {
  app.directive('maska', vMaska)

  const format = (app.config.globalProperties.$format = function format(
    val: number
  ): string {
    const [num, num2 = ''] = val.toString().split('.')
    const parts = num.match(/\d{1,3}(?=(\d{3})*$)/g) as string[]

    const preffixList = {
      1: '',
      2: 'млн.',
      3: 'млрд.',
      4: 'трлн.',
      5: 'квлн.',
      6: 'квинтл.',
    } as Record<number, string>
    const preffix = preffixList[parts.length - 1]
      ? preffixList[parts.length - 1]
      : ''

    if (val) {
      const znak = String(num).replace(/[^-]/gi, '')
      if (preffixList[parts.length - 1]) {
        const after = [parts!.slice(1, parts.length).join(''), num2]
          .join('')
          .slice(0, 2)

        return after
          ? znak +
              [parts!.slice(0, 1).join(' '), after.slice(0, 2)].join(',') +
              ' ' +
              preffix
          : znak + parts!.slice(0, 1).join(' ') + ' ' + preffix
      } else
        return znak + [parts!.join(' '), num2].filter((val) => !!val).join(',')
    }
    return '0'
  })
  const pretty = (app.config.globalProperties.$pretty = function pretty(
    val: string | number,
    after?: string
  ): string {
    return (format(+val) + ` ${after ?? ''}`).trim()
  })
}

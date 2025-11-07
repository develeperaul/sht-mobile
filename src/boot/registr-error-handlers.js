import { TimeoutError, HTTPError } from 'ky'
import { Notify } from 'quasar'
import { cleanTokensData } from 'src/api/tokens'
export default ({ app, router }) => {
  window.addEventListener('unhandledrejection', ({ reason: err }) => {
    errorHandler(err)
  })

  window.addEventListener('error', (errMessage) => {
    console.error('global', errMessage)
  })

  app.config.errorHandler = (err, vm, info) => {
    errorHandler(err)
  }

  async function errorHandler(err) {
    // console.log(err.response.status)

    if (err instanceof TimeoutError) {
      return 'reload'
    } else if (err instanceof HTTPError) {
      if (err.response.status === 401) {
        cleanTokensData()
        console.log('tets')

        router.push({ name: 'auth' })
        // Notify.create({
        //   type: 'negative',
        //   message: 'Test 401',
        //   position: 'top',
        // });
        return
      } else if (err.response.status === 403) {
        console.log(403)
        Notify.create({
          type: 'negative',
          message: 'Доступ запрещен',
          position: 'top',
        })
        return
      } else if (err.response.status === 404) {
        console.log(404)
        Notify.create({
          type: 'negative',
          message: 'Ресурс не найден',
          position: 'top',
        })
        return
      } else if (err.response.status === 429) {
        console.log(429)
        const { message } = await err.response.json()
        Notify.create({
          type: 'negative',
          message: message,
          position: 'top',
        })
        return
      } else if (err.response.status === 422) {
        const { message } = await err.response.json()
        Notify.create({
          type: 'negative',
          message: message,
          position: 'top',
        })
        return
      }
      Notify.create({
        type: 'negative',
        message: 'Ошибка сервера',
        position: 'top',
      })
      console.log(500)
      return
    }

    console.log(err.response)
  }
}

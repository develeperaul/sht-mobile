import ky, { KyInstance } from 'ky'
import * as Tokens from './tokens'

export class Server {
  mainKy: KyInstance
  constructor(
    url: string,
    option: { prefix: string; timeout?: number | false }
  ) {
    const prefixUrl = url + option.prefix
    this.mainKy = ky.create({
      prefixUrl: prefixUrl,
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set('X-Requested-With', 'ky')
            const accessToken = Tokens.getAccessToken()

            if (accessToken !== null)
              request.headers.set('Authorization', 'Bearer ' + accessToken)
          },
        ],
      },
      timeout: option.timeout ?? false,
    })
  }
}

export const api = new Server(process.env.BASE_URL!, {
  prefix: process.env.BASE_URL_PREFIX!,
})

export const apiAuth = new Server(process.env.BASE_URL!, {
  prefix: process.env.BASE_URL_PREFIX!,
  timeout: 60000,
})

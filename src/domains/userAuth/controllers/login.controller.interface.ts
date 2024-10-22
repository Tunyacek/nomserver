import { type ExpressControllerFn } from '../../../lib/utils'

export interface LoginController {
  checkUser: ExpressControllerFn
}

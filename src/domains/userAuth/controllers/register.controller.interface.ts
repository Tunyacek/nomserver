import { type ExpressControllerFn } from '../../../lib/utils'

export interface RegisterController {
  createUser: ExpressControllerFn
}

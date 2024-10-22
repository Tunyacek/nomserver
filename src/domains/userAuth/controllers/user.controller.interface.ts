import { type ExpressControllerFn } from '../../../lib/utils'

export interface UserController {
  authenticatedUser: ExpressControllerFn
  // refresh: ExpressControllerFn
  logout: ExpressControllerFn
}

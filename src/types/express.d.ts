import { Request } from 'express'

interface User {
  id: string
  email: string
  username: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}

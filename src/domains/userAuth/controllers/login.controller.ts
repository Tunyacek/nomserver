import { Request, Response, NextFunction } from 'express'
import { ExpressControllerFn } from '../../../lib/utils'
import { LoginService } from '../services/login.service.interface'
import { generateAccessToken /*generateRefreshToken*/ } from '../../../lib/jwt'
import { StatusCodes } from 'http-status-codes'
import { UserService } from '../services/user.service.interface'

type LoginControllerFactory = (
  loginService: LoginService,
  userService: UserService
) => {
  checkUser: ExpressControllerFn
}

export const loginControllerFactory: LoginControllerFactory = (
  loginService: LoginService,
  userService: UserService
) => {
  const checkUser = async (req: Request, res: Response, _next: NextFunction) => {
    const { username, password } = req.body
    const user = await loginService.checkUser(username, password)
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send()
    }

    //const refreshToken = generateRefreshToken(user.id)
    //const savedRefreshToken = await userService.createRefreshToken(user.id, refreshToken)

    const accessToken = generateAccessToken(user.id)

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    /*res.cookie('refresh_token', savedRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
*/
    const tokenResponse = await userService.createAccessToken(user.id, accessToken)

    return res.status(StatusCodes.OK).send({ token: tokenResponse.token })
  }

  return { checkUser }
}

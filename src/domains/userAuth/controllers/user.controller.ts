import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import 'dotenv/config'
import { StatusCodes } from 'http-status-codes'
import { UserService } from '../services/user.service.interface'
//import { generateAccessToken } from '../../../lib/jwt'

const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
//const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'

export const authenticatedUserControllerFactory = (userService: UserService) => {
  const authenticatedUser = async (req: Request, res: Response) => {
    try {
      const accessToken = req.header('Authorization')?.split(' ')[1] || ''

      if (!accessToken) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Chybí přístupový token',
        })
      }

      const payload = verify(accessToken, accessSecret) as { id: string }
      if (!payload) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Neplatný přístupový token',
        })
      }

      const user = await userService.authenticatedUser(payload.id)
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Uživatel nebyl nalezen',
        })
      }

      const { password, ...data } = user
      return res.status(StatusCodes.OK).send(data)
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Interní chyba serveru při ověřování uživatele',
      })
    }
  }

  /*const refresh = async (req: Request, res: Response) => {
    try {
      const cookie = req.cookies['refresh_token']
      if (!cookie) {
        console.error('Refresh token missing')
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Chybí obnovovací token',
        })
      }

      const payload = verify(cookie, refreshSecret) as { id: string }
      if (!payload) {
        console.error('Invalid refresh token')
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Neplatný obnovovací token',
        })
      }

      const storedRefreshToken = await userService.findToken(payload.id, cookie)
      if (!storedRefreshToken) {
        console.error('Refresh token not found or invalid')
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Obnovovací token nebyl nalezen nebo je neplatný',
        })
      }

      const newAccessToken = generateAccessToken(payload.id)
      return res.status(StatusCodes.OK).send({ token: newAccessToken })
    } catch (error) {
      console.error('Error refreshing token:', error) // Log the exact error
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Interní chyba serveru při obnovování tokenu',
      })
    }
  }*/

  const logout = async (req: Request, res: Response) => {
    res.cookie('access_token', '', { maxAge: 0 })
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Přístupový token nebyl nalezen',
      })
    }

    const token = authHeader.split(' ')[1]

    try {
      const payload = verify(token, accessSecret) as { id: string }
      if (!payload) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Chybný přístupový token',
        })
      }

      await userService.deleteToken(payload.id, token)

      res.setHeader('authorization', '')

      return res.status(StatusCodes.OK).send({
        message: 'Úspěšně odhlášen',
      })
    } catch (error) {
      console.error('Logout error:', error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Odhlášení se nepodařilo',
      })
    }
  }

  return { authenticatedUser, /*refresh*/ logout }
}

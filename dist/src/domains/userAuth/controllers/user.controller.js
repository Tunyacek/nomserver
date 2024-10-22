'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserControllerFactory = void 0
const jsonwebtoken_1 = require('jsonwebtoken')
require('dotenv/config')
const http_status_codes_1 = require('http-status-codes')
//import { generateAccessToken } from '../../../lib/jwt'
const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
//const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'
const authenticatedUserControllerFactory = (userService) => {
  const authenticatedUser = async (req, res) => {
    try {
      const accessToken = req.header('Authorization')?.split(' ')[1] || ''
      if (!accessToken) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Chybí přístupový token',
        })
      }
      const payload = (0, jsonwebtoken_1.verify)(accessToken, accessSecret)
      if (!payload) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Neplatný přístupový token',
        })
      }
      const user = await userService.authenticatedUser(payload.id)
      if (!user) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Uživatel nebyl nalezen',
        })
      }
      const { password, ...data } = user
      return res.status(http_status_codes_1.StatusCodes.OK).send(data)
    } catch (error) {
      return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
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
  const logout = async (req, res) => {
    res.cookie('access_token', '', { maxAge: 0 })
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
        message: 'Přístupový token nebyl nalezen',
      })
    }
    const token = authHeader.split(' ')[1]
    try {
      const payload = (0, jsonwebtoken_1.verify)(token, accessSecret)
      if (!payload) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Chybný přístupový token',
        })
      }
      await userService.deleteToken(payload.id, token)
      res.setHeader('authorization', '')
      return res.status(http_status_codes_1.StatusCodes.OK).send({
        message: 'Úspěšně odhlášen',
      })
    } catch (error) {
      console.error('Logout error:', error)
      return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Odhlášení se nepodařilo',
      })
    }
  }
  return { authenticatedUser, /*refresh*/ logout }
}
exports.authenticatedUserControllerFactory = authenticatedUserControllerFactory

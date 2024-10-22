'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserControllerFactory = void 0
const jsonwebtoken_1 = require('jsonwebtoken')
require('dotenv/config')
const http_status_codes_1 = require('http-status-codes')
const jwt_1 = require('../../../lib/jwt')
const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'
const authenticatedUserControllerFactory = (userService) => {
  const authenticatedUser = async (req, res) => {
    try {
      const cookie = req.cookies['access_token']
      const payload = (0, jsonwebtoken_1.verify)(cookie, accessSecret)
      if (!payload) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Access token chybí',
        })
      }
      const user = await userService.authenticatedUser(payload.id)
      if (!user) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Uživatel nenalezen',
        })
      }
      const { password, ...data } = user
      return res.send(data)
    } catch (error) {
      return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
        message: 'Chybný access token',
      })
    }
  }
  const refresh = async (req, res) => {
    try {
      const cookie = req.cookies['refresh_token']
      const payload = (0, jsonwebtoken_1.verify)(cookie, refreshSecret)
      if (!payload) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
          message: 'Refresh token chybí',
        })
      }
      const newAccessToken = (0, jwt_1.generateAccessToken)(payload.id)
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      res.status(http_status_codes_1.StatusCodes.OK).send({
        message: 'V pořádku',
      })
    } catch (error) {
      return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
        message: 'Chybný refresh token',
      })
    }
  }
  return { authenticatedUser, refresh }
}
exports.authenticatedUserControllerFactory = authenticatedUserControllerFactory

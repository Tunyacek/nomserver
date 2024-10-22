'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginControllerFactory = void 0
const jwt_1 = require('../../../lib/jwt')
const http_status_codes_1 = require('http-status-codes')
const loginControllerFactory = (service) => {
  const checkUser = async (req, res, _next) => {
    const { username, password } = req.body
    const user = await service.checkUser(username, password)
    if (!user) {
      return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user.id)
    const refreshToken = (0, jwt_1.generateRefreshToken)(user.id)
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.redirect('/recipes')
  }
  return { checkUser }
}
exports.loginControllerFactory = loginControllerFactory

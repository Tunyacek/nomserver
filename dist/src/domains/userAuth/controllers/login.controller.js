'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginControllerFactory = void 0
const jwt_1 = require('../../../lib/jwt')
const http_status_codes_1 = require('http-status-codes')
const loginControllerFactory = (loginService, userService) => {
  const checkUser = async (req, res, _next) => {
    const { username, password } = req.body
    const user = await loginService.checkUser(username, password)
    if (!user) {
      return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send()
    }
    //const refreshToken = generateRefreshToken(user.id)
    //const savedRefreshToken = await userService.createRefreshToken(user.id, refreshToken)
    const accessToken = (0, jwt_1.generateAccessToken)(user.id)
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
    return res.status(http_status_codes_1.StatusCodes.OK).send({ token: tokenResponse.token })
  }
  return { checkUser }
}
exports.loginControllerFactory = loginControllerFactory

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateAccessToken = void 0
const jsonwebtoken_1 = require('jsonwebtoken')
require('dotenv/config')
const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
//const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'
const generateAccessToken = (userId) => {
  return (0, jsonwebtoken_1.sign)({ id: userId }, accessSecret, { expiresIn: '1w' })
}
exports.generateAccessToken = generateAccessToken
/*export const generateRefreshToken = (userId: string): string => {
  return sign({ id: userId }, refreshSecret, { expiresIn: '1w' })
}*/

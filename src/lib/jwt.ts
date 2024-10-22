import { sign } from 'jsonwebtoken'
import 'dotenv/config'

const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
//const refreshSecret = process.env.JWT_REFRESH_SECRET || 'pleasewritemeindotenv'

export const generateAccessToken = (userId: string): string => {
  return sign({ id: userId }, accessSecret, { expiresIn: '1w' })
}

/*export const generateRefreshToken = (userId: string): string => {
  return sign({ id: userId }, refreshSecret, { expiresIn: '1w' })
}*/

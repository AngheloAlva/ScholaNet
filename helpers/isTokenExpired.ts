import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = (token: string): boolean => {
  if (token.length === 0) return true

  const decodedToken = jwtDecode(token)

  if (typeof decodedToken.exp !== 'undefined' && decodedToken.exp * 1000 < Date.now()) {
    return true
  }

  return false
}

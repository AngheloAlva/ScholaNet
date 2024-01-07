import { jwtDecode, type JwtPayload } from 'jwt-decode'

export const getRoleFromToken = (token: string): string | null => {
  if (token == null) return null

  try {
    const decoded: JwtPayload & { role: string } = jwtDecode(token)
    return decoded.role
  } catch (error) {
    return null
  }
}

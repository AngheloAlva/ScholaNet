/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export const getUserIdFromToken = (): string => {
  const token = Cookies.get('refreshToken')
  const { userId } = (token != null) ? jwtDecode(token) as { userId: string } : { userId: '' }

  return userId
}

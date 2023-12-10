import { create } from 'zustand'

interface AuthState {
  token: string | null
  refreshToken: string | null
  setTokens: (token: string, refreshToken: string) => void
  clearTokens: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  setTokens: (token: string, refreshToken: string) => { set({ token, refreshToken }) },
  clearTokens: () => { set({ token: null, refreshToken: null }) }
}))

export default useAuthStore

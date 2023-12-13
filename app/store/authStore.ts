import { create } from 'zustand'

interface AuthState {
  token: string | null
  refreshToken: string | null
  email: string
  setEmail: (email: string) => void
  setTokens: (token: string, refreshToken: string) => void
  clearTokens: () => void
  clearEmail: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  email: '',
  setEmail: (email: string) => { set({ email }) },
  setTokens: (token: string, refreshToken: string) => { set({ token, refreshToken }) },
  clearTokens: () => { set({ token: null, refreshToken: null }) },
  clearEmail: () => { set({ email: '' }) }
}))

export default useAuthStore

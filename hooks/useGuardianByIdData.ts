'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/api/user/user'

import type { User } from '@/types/user/user'

const useGuardianByIdData = (id: string): { guardian: User } => {
  const [guardian, setGuardian] = useState<User>({
    _id: '',
    name: '',
    lastName: '',
    rut: '',
    email: '',
    password: '',
    role: 'guardian',
    students: [],
    state: 'active',
    verificationCode: '',
    emailVerified: true,
    refreshToken: ''
  })

  useEffect(() => {
    const fetchGuardian = async (): Promise<void> => {
      const guardian = await getUser(id)
      setGuardian(guardian)
    }

    void fetchGuardian()
  }, [])

  return {
    guardian
  }
}

export default useGuardianByIdData

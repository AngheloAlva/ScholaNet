'use client'

import { useEffect, useState } from 'react'
import { getStudentsByGuardian, getUser } from '@/api/user/user'

import type { User } from '@/types/user/user'
import type { Student } from '@/types/student/student'

const useGuardianByIdData = (id: string): { guardian: User, students: Student[] } => {
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
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const guardian = await getUser(id)
      const students = await getStudentsByGuardian(id)
      setGuardian(guardian)
      setStudents(students)
    }

    void fetchData()
  }, [])

  return {
    guardian,
    students
  }
}

export default useGuardianByIdData

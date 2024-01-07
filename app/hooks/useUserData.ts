import { useEffect, useState } from 'react'
import { getUsers } from '@/api/user/user'

import { useToast } from '@/app/components/ui/use-toast'
import type { User } from '@/types/user/user'

const useUserData = (): {
  users: User[]
  totalUsers: number
  reloadUsers: () => Promise<void>
} => {
  const [users, setUsers] = useState<User[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await getUsers({ limit: 5, page: 1 })
        setUsers(response.users)
        setTotalUsers(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching users',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchUsers()
  }, [])

  const reloadUsers = async (): Promise<void> => {
    try {
      const response = await getUsers({ limit: 5, page: 1 })
      setUsers(response.users)
      setTotalUsers(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching users',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    users,
    totalUsers,
    reloadUsers
  }
}

export default useUserData

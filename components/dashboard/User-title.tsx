'use client'

import { useUser } from '@clerk/nextjs'

function UserTitle (): React.ReactElement {
  const { user, isLoaded } = useUser()

  return (
    <h1 className='text-5xl md:text-6xl font-bold'>Welcome {isLoaded ? user?.firstName : 'User'}</h1>
  )
}

export default UserTitle

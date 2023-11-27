'use client'

import { useUser } from '@clerk/nextjs'

function UserTitle (): React.ReactElement {
  const { user, isLoaded } = useUser()

  return (
    <h1 className='text-4xl font-bold'>Welcome {isLoaded ? user?.firstName ?? 'User' + user?.lastName : 'Loading'}</h1>
  )
}

export default UserTitle

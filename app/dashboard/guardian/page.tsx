/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

'use client'

import UserTitle from '@/components/dashboard/User-title'
import useGuardianByIdData from '@/hooks/useGuardianByIdData'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function DashboardPage (): React.ReactElement {
  const token = Cookies.get('refreshToken')
  const { userId } = (token != null) ? jwtDecode(token) as { userId: string } : { userId: '' }

  const { guardian, students } = useGuardianByIdData(userId)

  return (
    <>
      <header className='flex flex-col w-screen px-5 bg-bg-200 pb-10 items-center pt-16'>
        <div className='md:flex md:justify-between'>
          <UserTitle name={guardian.name + ' ' + guardian.lastName } />
          <Image src={'/intro-dashboard.png'} alt='Dashboard Presentation' width={768} height={500} className='md:w-96' />
        </div>

        <div className='shadow-lg flex flex-col gap-4 py-7 mb-10 items-center rounded-lg mt-10 bg-bg-100 w-full max-w-4xl text-text-100'>
          <p className='text-xl font-semibold'>No students registered</p>
          <Button className='text-lg'>
            <Link href={'/dashboard/guardian/add-student'}>
              Add a student to your account
            </Link>
          </Button>
        </div>
      </header>
    </>
  )
}

export default DashboardPage

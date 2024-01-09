import Link from 'next/link'
import React from 'react'

import { SheetFooter } from '@/app/components/ui/sheet'
import { Button } from '@/app/components/ui/button'

function SheetFooterNav (): React.ReactElement {
  return (
    <SheetFooter className='flex flex-col gap-4 pt-5'>
      <Link href={'/auth/student'}>
        <Button variant={'outline'} className='w-full bg-accent-100 text-bg-100'>
            Student Access
        </Button>
      </Link>
      <div className='flex gap-2 flex-row items-center w-full'>
        <Link href={'auth/login'} className='w-full'>
          <Button variant={'outline'} className='w-full'>
              Login
          </Button>
        </Link>
        <Link href={'auth/register'} className='w-full'>
          <Button className='w-full hover:bg-primary-100 hover:text-bg-100'>
              Register
          </Button>
        </Link>
      </div>
    </SheetFooter>
  )
}

export default SheetFooterNav

import Link from 'next/link'
import React from 'react'

import { SheetFooter } from '@/app/components/ui/sheet'
import { Button } from '@/app/components/ui/button'

function SheetFooterNav (): React.ReactElement {
  return (
    <SheetFooter className='flex gap-2 flex-row items-center w-full mt-5'>
      <Link href={'auth/login'} className='w-full'>
        <Button variant={'secondary'} className='w-full hover:bg-primary-100 hover:text-bg-100'>
            Login
        </Button>
      </Link>
      <Link href={'auth/register'} className='w-full'>
        <Button variant={'outline'} className='w-full hover:bg-accent-100 hover:text-bg-100'>
            Register
        </Button>
      </Link>
    </SheetFooter>
  )
}

export default SheetFooterNav

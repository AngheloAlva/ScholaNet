import { Button } from '@/components/ui/button'
import { SheetFooter } from '@/components/ui/sheet'
import Link from 'next/link'
import React from 'react'

function SheetFooterNav (): React.ReactElement {
  return (
    <SheetFooter className='flex gap-2 flex-row items-center w-full mt-5'>
      <Button variant={'outline'} className='w-full'>
        <Link href={'auth/login'}>
          Login
        </Link>
      </Button>
      <Button variant={'secondary'} className='w-full'>
        <Link href={'auth/register'}>
          Register
        </Link>
      </Button>
    </SheetFooter>
  )
}

export default SheetFooterNav

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '../ui/sheet'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

import { MdMenuOpen } from 'react-icons/md'
import { FaRegDotCircle } from 'react-icons/fa'
import MenuItem from './Menu-item'

function SheetNavbar (): React.ReactElement {
  return (
    <Sheet>
        <SheetTrigger className='text-3xl'>
          <MdMenuOpen />
        </SheetTrigger>
        <SheetContent className='text-white'>
          <SheetHeader>
            <SheetTitle>ScholaNet</SheetTitle>
            <SheetDescription>
              A social network for students and teachers
            </SheetDescription>
            <Separator />

            <ul className='flex flex-col font-bold pt-4 pb-6'>
              <MenuItem text='Home' />
              <MenuItem text='About' />
              <MenuItem text='Admissions' />
              <li className='w-full rounded-sm py-1 transition-colors text-left px-4 mt-4'>
                Educational Level
              </li>
              <MenuItem
                text={<><FaRegDotCircle className='text-xs' /> Primary</>}
                className='px-6 font-normal flex items-center gap-2'
              />
              <MenuItem
                text={<><FaRegDotCircle className='text-xs' /> Secondary</>}
                className='px-6 font-normal flex items-center gap-2'
              />
              <MenuItem text='Programs & Courses' className='mt-4' />
              <MenuItem text='News & Events' />
            </ul>

            <Separator />

            <SheetFooter className='flex gap-2 flex-row w-full'>
              <Button variant={'outline'} className='w-full'>
                Sign In
              </Button>
              <Button variant={'outline'} className='w-full'>
                Enroll
              </Button>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
  )
}

export default SheetNavbar

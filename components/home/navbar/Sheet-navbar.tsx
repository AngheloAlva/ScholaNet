import React from 'react'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '../../ui/sheet'
import { Separator } from '../../ui/separator'

import { MdMenuOpen } from 'react-icons/md'
import { FaRegDotCircle } from 'react-icons/fa'
import MenuItem from './Menu-item'

function SheetNavbar (): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger className='text-3xl lg:hidden'>
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
        </SheetHeader>
        <SheetFooter className='flex gap-2 flex-col w-full mt-5'>
          <SignInButton
            className='border border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            afterSignInUrl='/'
            afterSignUpUrl='/'
          />
          <SignUpButton
            className='border border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            afterSignInUrl='/'
            afterSignUpUrl='/'
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SheetNavbar

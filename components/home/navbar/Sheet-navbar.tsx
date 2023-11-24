import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '../../ui/sheet'
import { Button } from '../../ui/button'
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

            {/* <MenuItem text={<><PiStudentDuotone className='text-lg' /> Studen Access</>} className='px-6 font-normal flex items-center gap-2' />
          <MenuItem text={<><PiChalkboardTeacherDuotone className='text-lg' /> Teacher Access</>} className='px-6 font-normal flex items-center gap-2' />
          <MenuItem text={<><MdOutlineAddToPhotos className='text-lg' /> Request a place</>} className='px-6 font-normal flex items-center gap-2' /> */}
            <SheetFooter className='flex gap-2 flex-col w-full'>
              <div className='flex gap-2'>
                <Button variant={'outline'} className='w-full'>
                  Studen Access
                </Button>
                <Button variant={'outline'} className='w-full'>
                  Teacher Access
                </Button>
              </div>
              <Button variant={'outline'} className='w-full'>
                Request a place
              </Button>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
  )
}

export default SheetNavbar

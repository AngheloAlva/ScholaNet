import React from 'react'
import MenuItem from './Menu-item'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { FaAngleDown, FaRegUser } from 'react-icons/fa'
import { PiStudentDuotone, PiChalkboardTeacherDuotone } from 'react-icons/pi'
import { MdOutlineAddToPhotos } from 'react-icons/md'

function NavMenu (): React.ReactElement {
  return (
    <ul className='hidden lg:flex'>
      <MenuItem text='About' className='w-auto' />
      <MenuItem text='Admissions' className='w-auto' />
      <MenuItem text='Programs & Courses' className='w-auto' />
      <MenuItem text='News & Events' className='w-auto' />
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 hover:bg-bg-100 rounded-sm py-1 transition-colors px-4'>
          <FaAngleDown /> Educational Level
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <MenuItem text='Primary' className='px-6 font-normal flex items-center gap-2' />
          <MenuItem text='Secondary' className='px-6 font-normal flex items-center gap-2' />
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 hover:bg-bg-100 rounded-sm py-1 transition-colors px-4'>
          <FaRegUser />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <MenuItem text={<><PiStudentDuotone className='text-lg' /> Studen Access</>} className='px-6 font-normal flex items-center gap-2' />
          <MenuItem text={<><PiChalkboardTeacherDuotone className='text-lg' /> Teacher Access</>} className='px-6 font-normal flex items-center gap-2' />
          <MenuItem text={<><MdOutlineAddToPhotos className='text-lg' /> Request a place</>} className='px-6 font-normal flex items-center gap-2' />
        </DropdownMenuContent>
      </DropdownMenu>
    </ul>
  )
}

export default NavMenu

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../ui/sheet'
import { Separator } from '../../ui/separator'
import MenuItem from './Menu-item'
import { MdMenuOpen } from 'react-icons/md'
import { FaRegDotCircle } from 'react-icons/fa'
import SheetFooterNav from './Sheet-footer'

function SheetNavbar (): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger className='text-3xl lg:hidden flex items-center gap-5'>
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
            <MenuItem href='/dashboard' text='Dashboard' />
            <MenuItem href='#' text='About' />
            <li className='w-full rounded-sm py-1 transition-colors text-left px-4 mt-4'>
              Educational Level
            </li>
            <MenuItem
              text={<><FaRegDotCircle className='text-xs' /> Primary</>}
              href='#'
              className='px-6 font-normal flex items-center gap-2'
            />
            <MenuItem
              text={<><FaRegDotCircle className='text-xs' /> Secondary</>}
              href='#'
              className='px-6 font-normal flex items-center gap-2'
            />
            <MenuItem href='#' text='Programs & Courses' className='mt-4' />
            <MenuItem href='#' text='News & Events' />
          </ul>

          <Separator />
        </SheetHeader>

        <SheetFooterNav />
      </SheetContent>
    </Sheet>
  )
}

export default SheetNavbar

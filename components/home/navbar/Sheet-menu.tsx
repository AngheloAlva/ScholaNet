import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
import MenuItem from './Menu-item'
import { MdMenuOpen } from 'react-icons/md'
import { FaRegDotCircle } from 'react-icons/fa'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function SheetNavbar (): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger className='text-3xl lg:hidden flex items-center gap-5'>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
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
        <SheetFooter className='flex gap-2 flex-row items-center w-full mt-5'>
          <SignedIn>
            <Button className='w-full p-0'>
              <Link href={'/dashboard'} className='w-full h-full flex items-center justify-center'>
                Go to Dashboard
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton
              className='border border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              afterSignInUrl='/dashboard'
            />
            <SignUpButton
              className='border border-input bg-background hover:bg-accent hover:text-accent-foreground py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              afterSignUpUrl='/dashboard'
            />
          </SignedOut>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SheetNavbar

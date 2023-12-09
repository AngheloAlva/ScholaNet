import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../ui/sheet'
import { Separator } from '../../ui/separator'
import MenuItem from '@/components/home/navbar/Menu-item'
import { MdMenuOpen } from 'react-icons/md'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function DashboardSheetMenu (): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger className='text-3xl lg:hidden flex items-center gap-5'>
        <MdMenuOpen />
      </SheetTrigger>
      <SheetContent className='text-white flex flex-col justify-between'>
        <SheetHeader>
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>
            Dashboard for tutors
          </SheetDescription>
          <Separator />

          <ul className='flex flex-col font-bold pt-4 pb-6'>
            <MenuItem href='/dashboard/alumns' text='Alumns' />
            <MenuItem href='/dashboard/payments' text='Payments' />
            <MenuItem href='/dashboard/support' text='Support & help' />
            <MenuItem href='/dashboard/announcements' text='Announcements' />
          </ul>
        </SheetHeader>
        <SheetFooter className='flex flex-row items-center justify-between'>
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
          <Button variant={'outline'}>
            <Link href='/'>
              Back to home
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DashboardSheetMenu

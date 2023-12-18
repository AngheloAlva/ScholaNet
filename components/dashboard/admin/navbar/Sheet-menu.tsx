import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import MenuItem from '@/components/home/navbar/Menu-item'
import { Separator } from '@/components/ui/separator'

import { MdMenuOpen } from 'react-icons/md'
import { Button } from '@/components/ui/button'

interface SheetMenuProps {
  menuList: Array<{
    href: string
    text: string
  }>
}

function SheetMenu ({ menuList }: SheetMenuProps): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger className='text-3xl xl:hidden flex items-center gap-5'>
        <Button className="rounded-full text-3xl bg-text-200 text-bg-100" size="icon" variant="ghost">
          <MdMenuOpen />
        </Button>
      </SheetTrigger>

      <SheetContent className='text-text-100 flex flex-col justify-between'>
        <SheetHeader>
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>Dashboard for admins</SheetDescription>
          <Separator />

          <ul className='flex flex-col font-bold pt-4 pb-6'>
            {
              menuList.map((item, index) => (
                <MenuItem
                  className='hover:bg-text-200 hover:text-bg-100'
                  href={item.href}
                  key={index}
                  text={item.text} />
              ))
            }
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SheetMenu

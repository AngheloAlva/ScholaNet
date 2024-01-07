import MenuItem from '@/app/components/home/navbar/Menu-item'
import { Separator } from '@/app/components/ui/separator'
import { MdMenuOpen } from 'react-icons/md'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/app/components/ui/sheet'

interface SheetMenuProps {
  menuList: Array<{
    href: string
    text: string
  }>
  title: string
  description: string
}

function SheetMenu (
  { menuList, title, description }: SheetMenuProps
): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger className='text-3xl xl:hidden flex items-center gap-5'>
        <MdMenuOpen className="rounded-full text-3xl bg-text-200 p-1 hover:bg-bg-300 hover:text-text-200 transition-colors text-bg-100 h-10 w-10" />
      </SheetTrigger>

      <SheetContent className='text-text-100 flex flex-col justify-between'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
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

import Image from 'next/image'
import Link from 'next/link'

import NavMenuList from '../admin/navbar/Nav-menu-list'
import SheetMenu from '../admin/navbar/Sheet-menu'
import UserDropdown from '../User-dropdown'

import menuList from '@/data/dashboard/teacher-nav-menu.json'

function TeacherNavBar (): React.ReactElement {
  return (
    <header className="flex w-screen bg-bg-100 shadow-md items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex justify-between items-center w-full">
        <Link href="/dashboard/admin">
          <Image src={'/logo.png'} alt="Logo" height="50" width="50" />
        </Link>
        <div className='flex xl:flex-row-reverse items-center gap-4'>
          <UserDropdown />

          <SheetMenu menuList={menuList} />

          <NavMenuList menuList={menuList} />
        </div>

      </nav>
    </header>
  )
}

export default TeacherNavBar

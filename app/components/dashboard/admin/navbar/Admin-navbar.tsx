import Image from 'next/image'
import Link from 'next/link'

import NavMenuList from '../../navbar/Nav-menu-list'
import UserDropdown from '../../../ui/User-dropdown'
import SheetMenu from '../../navbar/Sheet-menu'

import menuList from '@/data/dashboard/admin-nav-menu.json'

function AdminNavbar (): React.ReactElement {
  return (
    <header className="flex w-screen bg-bg-100 shadow-md items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex justify-between items-center w-full">
        <Link href="/dashboard/admin">
          <Image src={'/logo.png'} alt="Logo" height="50" width="50" />
        </Link>
        <div className='flex xl:flex-row-reverse items-center gap-4'>
          <UserDropdown />

          <SheetMenu menuList={menuList} title='Admin navbar' description='Navbar menu for admins' />

          <NavMenuList menuList={menuList} />
        </div>

      </nav>
    </header>
  )
}

export default AdminNavbar

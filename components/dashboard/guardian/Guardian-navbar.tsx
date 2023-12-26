import Image from 'next/image'
import Link from 'next/link'

import UserDropdown from '../User-dropdown'

function GuardianNavbar (): React.ReactElement {
  return (
    <header className="flex w-screen bg-bg-100 shadow-md items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex justify-between items-center w-full">
        <Link href="/dashboard/guardian">
          <Image src={'/logo.png'} alt="Logo" height="50" width="50" />
        </Link>
        <div className='flex xl:flex-row-reverse items-center gap-4'>
          <UserDropdown />
        </div>

      </nav>
    </header>
  )
}

export default GuardianNavbar

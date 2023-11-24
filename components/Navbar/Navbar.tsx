import Image from 'next/image'
import React from 'react'

import SheetNavbar from './Sheet-navbar'
import NavMenu from './Nav-menu'

function Navbar (): React.ReactElement {
  return (
    <nav className='w-screen dark:bg-primary-100 h-16 flex items-center px-5 justify-between dark:text-text-200'>
      <div className='flex items-center gap-1'>
        <Image
          src={'/logo-white.png'}
          alt={'ScholaNet Logo'}
          width={50}
          height={50}
        />
        <h3 className='text-xl font-bold'>ScholaNet</h3>
      </div>

      <SheetNavbar />

      <NavMenu />
    </nav>
  )
}

export default Navbar

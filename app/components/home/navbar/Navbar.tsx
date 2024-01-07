import Image from 'next/image'
import React from 'react'

import SheetNavbar from './Sheet-menu'
import NavMenu from './Nav-menu'

function Navbar (): React.ReactElement {
  return (
    <nav className='w-screen fixed z-10 items-center bg-bg-100 shadow-lg px-5 py-2 flex justify-between'>
      <div className='flex items-center gap-1'>
        <Image
          src={'/logo.png'}
          alt={'ScholaNet Logo'}
          width={50}
          height={50}
        />
        <h3 className='text-xl font-bold text-text-100'>ScholaNet</h3>
      </div>

      <SheetNavbar />

      <NavMenu />
    </nav>
  )
}

export default Navbar

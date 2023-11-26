import Image from 'next/image'
import React from 'react'

import SheetNavbar from './Sheet-navbar'
import NavMenu from './Nav-menu'

function Navbar (): React.ReactElement {
  return (
    <nav className='fixed z-10 backdrop-blur-2xl items-center w-11/12 rounded-lg top-5 left-1/2 transform -translate-x-1/2 px-5 py-2 flex justify-between'>
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

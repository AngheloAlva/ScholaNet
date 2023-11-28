import Image from 'next/image'
import DashboardSheetMenu from './Sheet-menu'
import Link from 'next/link'

function DashboardNavbar (): React.ReactElement {
  return (
    <nav className='fixed z-10 backdrop-blur-2xl items-center w-11/12 rounded-lg top-5 left-1/2 transform -translate-x-1/2 px-5 py-2 flex justify-between'>
      <Link href='/dashboard'>
        <div className='flex items-center gap-1'>
          <Image
            src={'/logo.png'}
            alt={'ScholaNet Logo'}
            width={50}
            height={50}
          />
          <h3 className='text-xl font-bold'>ScholaNet</h3>
        </div>
      </Link>

      <DashboardSheetMenu />
    </nav>
  )
}

export default DashboardNavbar

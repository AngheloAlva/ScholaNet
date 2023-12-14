import Image from 'next/image'
import DashboardSheetMenu from './Sheet-menu'
import Link from 'next/link'

function DashboardNavbar (): React.ReactElement {
  return (
    <nav className='fixed z-10 bg-bg-100 items-center shadow-md w-screen px-5 py-2 flex justify-between'>
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

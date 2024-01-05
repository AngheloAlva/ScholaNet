import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa6'

function BackButton (
  { href }: { href: string }
): React.ReactElement {
  return (
    <Link href={href} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
      <FaAngleLeft className='text-lg' /> Go back
    </Link>
  )
}

export default BackButton

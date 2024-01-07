import { cn } from '@/app/lib/utils'
import Link from 'next/link'

import { FaAngleLeft } from 'react-icons/fa6'

function BackButton (
  { href, className }: { href: string, className?: string }
): React.ReactElement {
  return (
    <Link href={href} className={cn('flex items-center gap-2 my-5 font-semibold hover:underline', className)}>
      <FaAngleLeft className='text-lg' /> Go back
    </Link>
  )
}

export default BackButton

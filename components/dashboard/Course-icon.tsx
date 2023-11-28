import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'

export interface CourseIconProps {
  image: string
  alt: string
  buttonText: string
  href: string
}

function CourseIcon ({ image, alt, buttonText, href }: CourseIconProps): React.ReactElement {
  return (
    <div className='border-2 rounded-lg border-accent-200 p-1'>
      <Image
        src={image}
        alt={alt}
        width={400}
        height={400}
        className='rounded-sm'
      />
      <Button className='mt-1 w-full' variant={'default'}>
        <Link href={href}>
          {buttonText}
        </Link>
      </Button>
    </div>
  )
}

export default CourseIcon

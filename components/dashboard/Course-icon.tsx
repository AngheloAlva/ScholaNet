import Image from 'next/image'
import { Button } from '../ui/button'

export interface CourseIconProps {
  image: string
  alt: string
  buttonText: string
}

function CourseIcon ({ image, alt, buttonText }: CourseIconProps): React.ReactElement {
  return (
    <div className='border-2 rounded-lg border-accent-200 p-1'>
      <Image
        src={image}
        alt={alt}
        width={200}
        height={200}
        className='rounded-sm'
      />
      <Button className='mt-1 w-full' variant={'default'}>
        {buttonText}
      </Button>
    </div>
  )
}

export default CourseIcon

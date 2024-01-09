import Image from 'next/image'
import Link from 'next/link'

import { FaAngleRight } from 'react-icons/fa6'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'

interface Props {
  name: string
  description: string
  classroom: string
  image: string
  href: string
}

function CourseCard ({
  name, description, classroom, image, href
}: Props): React.ReactElement {
  return (
    <Card>
      <Link href={href}>
        <CardHeader>
          <CardTitle className='text-accent-100 flex justify-between items-center'>
            {name} <FaAngleRight className='text-xl' />
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={image} width={550} height={550} alt='Course image' className='rounded-md' />
        </CardContent>
        <CardFooter>
          <div className='text-text-100 text-sm flex flex-col'>
            <span>This class is in {classroom}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default CourseCard

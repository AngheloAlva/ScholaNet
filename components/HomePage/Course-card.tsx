import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Image from 'next/image'

import type { CourseCard } from '@/types'
import { FaCaretRight } from 'react-icons/fa'

const CourserCard = ({ title, description, image, href }: CourseCard): React.ReactElement => {
  return (
    <Card className='h-full justify-between flex flex-col'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className='rounded-sm'
          />
      </CardContent>
      <CardFooter>
        <Link href={href} className='font-normal text-base'>
          Learn More <FaCaretRight className='inline-block' />
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CourserCard

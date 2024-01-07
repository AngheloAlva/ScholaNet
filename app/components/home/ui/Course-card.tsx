import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaCaretRight } from 'react-icons/fa'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'

import type { CourseCard } from '@/types'

const CourserCard = ({ title, description, image, href }: CourseCard): React.ReactElement => {
  return (
    <Card className='h-full bg-bg-200 justify-between flex flex-col'>
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
            className='rounded-md'
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

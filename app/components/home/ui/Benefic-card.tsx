import Image from 'next/image'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../ui/card'

export interface BeneficCardProps {
  title: string
  description: string
  image: string
}

function BeneficCard ({ title, description, image }: BeneficCardProps): React.ReactElement {
  return (
    <Card className='rounded-md bg-bg-100 text-text-100 border-[1px] border-opacity-50 pt-5'>
      <CardContent className='pb-2'>
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className='rounded-md'
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default BeneficCard

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

import type { SimpleSchedule } from '@/types/course/schedule'

interface Props {
  name: string
  description: string
  classroom: string
  studentsLength: number
  schedule: SimpleSchedule[]
  image: string
  href: string
}

function CourseCard ({
  name, description, classroom, studentsLength, schedule, image, href
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
            <span>There are {studentsLength} students in this class</span>
            {
              schedule.map((day) => (
                <span key={day.startTime}>
                  From {day.startTime} to {day.endTime}
                </span>
              ))
            }
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default CourseCard

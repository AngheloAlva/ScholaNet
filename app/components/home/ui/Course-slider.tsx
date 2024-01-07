import CourserCard from './Course-card'

import type { CourseCard } from '@/types'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel'

interface CourseSliderProps {
  courses: CourseCard[]
}

const CourseSlider = ({ courses }: CourseSliderProps): React.ReactElement => {
  return (
    <Carousel className='w-full relative'>
      <CarouselContent>
        {
          courses.map((course) => (
            <CarouselItem key={course.title} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <CourserCard
                title={course.title}
                description={course.description}
                image={course.image}
                href={course.href}
              />
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className='left-0' />
      <CarouselNext className='right-0' />
    </Carousel>
  )
}

export default CourseSlider

import type { CourseCard } from '@/types'
import React from 'react'
import CourseSlider from './Course-slider'

interface CourseSectionProps {
  title: string
  description: string
  courses: CourseCard[]
}

function CourseSection ({ title, description, courses }: CourseSectionProps): React.ReactElement {
  return (
    <section className='p-5 w-screen'>
      <h2 className='text-2xl px-2 font-bold mb-2'>
        {title}
      </h2>
      <div className='h-3 border-t-[1px] border-x-[1px] w-full border-accent-200 opacity-50' />
      <p className='text-accent-200 my-3 px-2'>
        {description}
      </p>

      <div className='flex my-10'>
        <CourseSlider courses={courses} />
      </div>
    </section>
  )
}

export default CourseSection

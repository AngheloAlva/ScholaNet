import React from 'react'
import CourseSlider from './Course-slider'

import type { CourseCard } from '@/types'

interface CourseSectionProps {
  title: string
  subTitle: string
  description: string
  courses: CourseCard[]
}

function CourseSection ({ title, subTitle, description, courses }: CourseSectionProps): React.ReactElement {
  return (
    <section className='p-5 py-7 w-screen'>
      <h2 className='text-2xl text-text-100 px-2 font-bold mb-2'>
        {title}
        <span className='text-accent-100'>{subTitle}</span>
      </h2>
      <div className='h-3 border-t-[1px] border-x-[1px] w-full border-text-100 opacity-50' />
      <p className='text-text-200 my-3 px-2'>
        {description}
      </p>

      <div className='flex mt-10 mb-5'>
        <CourseSlider courses={courses} />
      </div>
    </section>
  )
}

export default CourseSection

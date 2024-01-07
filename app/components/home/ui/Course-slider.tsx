'use client'

import { Pagination } from 'swiper/modules'
import { useEffect, useRef } from 'react'
import Swiper from 'swiper'

import CourserCard from './Course-card'

import type { CourseCard } from '@/types'
import 'swiper/css/pagination'
import 'swiper/css'

interface CourseSliderProps {
  courses: CourseCard[]
}

const CourseSlider = ({ courses }: CourseSliderProps): React.ReactElement => {
  const swiperRef = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line no-new
    const swiperInstance = new Swiper(swiperRef.current ?? '', {
      slidesPerView: 1,
      spaceBetween: 15,
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        550: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 15
        }
      }
    })

    return () => {
      swiperInstance.destroy(true, true)
    }
  }, [])

  return (
    <div className='swiper' ref={swiperRef}>
      <div className='swiper-wrapper flex items-stretch'>
        {
          courses.map((course) => (
            <div className='swiper-slide flex-grow' key={course.title}>
              <CourserCard
                title={course.title}
                description={course.description}
                image={course.image}
                href={course.href}
              />
            </div>
          ))
        }
      </div>

      <div className='swiper-pagination'></div>
    </div>
  )
}

export default CourseSlider

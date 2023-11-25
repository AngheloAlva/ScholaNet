import CourseSlider from '@/components/home/Course-slider'
import Footer from '@/components/home/footer/Footer'
import Navbar from '@/components/home/navbar/Navbar'
import Image from 'next/image'

import primaryCourses from '@/data/primary-courses.json'
import secondayCourses from '@/data/secondary-courses.json'
import specialCourses from '@/data/special-courses.json'

function Home (): React.ReactElement {
  return (
    <>
      <Navbar />

      <div className='w-screen relative h-[50vw] max-h-[40vh]'>
        <Image
          src={'/welcome-back-students.svg'}
          alt={'Welcome back students'}
          className='object-cover object-center'
          fill
          priority
        />
      </div>

      <section className='p-5 mt-5'>
        <h2 className='text-3xl font-bold mb-2'>Our Programs for Basic Education</h2>
        <div className='flex'>
          <CourseSlider courses={primaryCourses} />
        </div>
      </section>

      <section className='p-5'>
        <h2 className='text-3xl font-bold mb-2'>Our Programs for Secondary Education</h2>
        <div className='flex'>
          <CourseSlider courses={secondayCourses} />
        </div>
      </section>

      <section className='p-5'>
        <h2 className='text-3xl font-bold'>Special Programs</h2>
        <div className='flex'>
          <CourseSlider courses={specialCourses} />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home

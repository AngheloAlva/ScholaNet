import Image from 'next/image'
import CourseSection from '@/components/home/Course-section'
import BeneficCard from '@/components/home/Benefic-card'
import Navbar from '@/components/home/navbar/Navbar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { beneficCards, coursesSections } from '../data/home-sections'

function Home (): React.ReactElement {
  return (
    <>
      <Navbar />

      <header className='w-screen relative h-[99vh] p-5 flex'>
        <div className='relative w-full h-full'>
          <Image
            src={'/home-banner-q.png'}
            alt={'Welcome back students'}
            fill
            className='object-cover object-center rounded-lg'
          />
          <div className='absolute font-bold border-2 border-accent-200 text-5xl backdrop-blur-xl px-7 py-5 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h1>ScholaNet</h1>
          </div>

          <div className='absolute font-bold border-2 border-accent-200 text-3xl backdrop-blur-xl px-10 py-5 rounded-lg bottom-10 left-1/2 transform -translate-x-1/2 w-5/6'>
            <h2 className='text-stone-400'>Empowering the Next</h2>
            <h2 className='text-white'>Generation of Learners</h2>
          </div>
        </div>
        <div className='w-1/2 hidden'>

        </div>
      </header>

      <main className='p-10 bg-bg-200 w-screen flex flex-col items-center'>
        <Separator className='bg-white' />
        <h2 className='text-3xl text-center font-bold my-3 text-accent-100'>Redefining Education with ScholaNet</h2>
        <Separator className='bg-white' />

        <div className='mt-10 text-accent-200'>
          ScholaNet is at the forefront of transforming the educational landscape. By integrating advanced technology and innovative teaching methodologies, we are crafting a learning environment that is both engaging and effective. Our platform connects students and educators in a dynamic, interactive setting, fostering a community of collaborative learning and intellectual growth.
        </div>

        <div className='mt-20 text-accent-200'>
          <p className='font-semibold text-2xl mb-2 text-accent-100'>
            <span className='uppercase text-3xl ml-5'>ScholaNet</span>
            stands out with its unique approach to education.
          </p>
          We understand that each student's journey is distinct, and our adaptive learning paths ensure personalized experiences that resonate with every learner. Our commitment to excellence and inclusivity is paving the way for a brighter, more knowledgeable future.
        </div>

        <Button className='my-24 bg-transparent border-[1px] border-accent-100 text-accent-100 rounded-full px-7 hover:bg-accent-100 hover:text-bg-100'>
          Want to join?
        </Button>
      </main>

      {
        coursesSections.map(section => (
          <CourseSection
            key={section.title}
            title={section.title}
            description={section.description}
            courses={section.courses}
          />
        ))
      }

      <section className='w-screen flex flex-col items-center p-5 pb-20 bg-bg-200'>
        <h3 className='text-3xl text-center font-bold my-3 text-accent-100'>Join the ScholaNet Community Today</h3>
        <p className='text-accent-200 text-center mb-10'>Experience the future of learning. Discover, grow, and excel with ScholaNet.</p>
        <Separator className='bg-white my-5' />
        <Separator className='bg-white opacity-70 mb-5' />
        <Separator className='bg-white opacity-40 mb-5' />
        <Separator className='bg-white opacity-20 mb-5' />
        <Separator className='bg-white opacity-5 mb-10' />

        <div className='flex flex-col gap-4 w-full'>
          {
            beneficCards.map(card => (
              <BeneficCard
                key={card.title}
                title={card.title}
                description={card.description}
                image={card.image}
              />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Home

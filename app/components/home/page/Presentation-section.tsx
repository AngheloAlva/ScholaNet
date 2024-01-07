import Link from 'next/link'

import { Separator } from '../../ui/separator'
import { Button } from '../../ui/button'

function IntroducctionSection (): React.ReactElement {
  return (
    <main className='p-10 bg-bg-200 w-screen flex flex-col items-center'>
      <Separator className='bg-text-200' />
      <h2 className='text-3xl text-center font-bold my-3 text-text-100'>Redefining Education with ScholaNet</h2>
      <Separator className='bg-text-200' />

      <div className='mt-10 text-text-200'>
        ScholaNet is at the forefront of transforming the educational landscape. By integrating advanced technology and innovative teaching methodologies, we are crafting a learning environment that is both engaging and effective. Our platform connects students and educators in a dynamic, interactive setting, fostering a community of collaborative learning and intellectual growth.
      </div>

      <div className='mt-20 text-text-200'>
        <p className='font-semibold text-2xl mb-2 text-text-100'>
          <span className='uppercase text-3xl ml-5 text-accent-100'>ScholaNet</span>
          stands out with its unique approach to education.
        </p>
        We understand that each student's journey is distinct, and our adaptive learning paths ensure personalized experiences that resonate with every learner. Our commitment to excellence and inclusivity is paving the way for a brighter, more knowledgeable future.
      </div>

      <Link href='/auth/register'>
        <Button className='my-24 bg-transparent border-[1px] border-accent-100 text-accent-100 rounded-full px-7 hover:bg-accent-100 hover:text-bg-100'>
          Want to join?
        </Button>
      </Link>
    </main>
  )
}

export default IntroducctionSection

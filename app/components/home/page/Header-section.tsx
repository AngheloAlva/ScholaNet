import Image from 'next/image'

function HeaderSection (): React.ReactElement {
  return (
    <header className='w-screen relative h-[99vh] p-5 flex'>
      <div className='relative w-full h-full'>
        <Image
          src={'/home-banner.png'}
          alt={'Welcome back students'}
          fill
          className='object-cover object-center rounded-lg'
        />
        <div className='absolute text-text-100 font-bold border-2 border-bg-300 text-5xl backdrop-blur-xl px-7 py-5 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1>ScholaNet</h1>
        </div>

        <div className='absolute font-bold border-2 border-bg-100 text-3xl backdrop-blur-xl px-10 py-5 rounded-lg bottom-10 left-1/2 transform -translate-x-1/2 w-5/6'>
          <h2 className='text-accent-100'>Empowering the Next</h2>
          <h2 className='text-text-100'>Generation of Learners</h2>
        </div>
      </div>
      <div className='w-1/2 hidden'>

      </div>
    </header>
  )
}

export default HeaderSection

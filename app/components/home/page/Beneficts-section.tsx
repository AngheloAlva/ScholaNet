import { Separator } from '../../ui/separator'
import BeneficCard from '../ui/Benefic-card'

import { beneficCards } from '@/data/home-sections'

function BenefictsSection (): React.ReactElement {
  return (
    <section className='w-screen flex flex-col items-center p-5 pb-20 bg-bg-200'>
      <h3 className='text-3xl text-center font-bold my-3 text-accent-100'>
        Join the ScholaNet Community Today
      </h3>
      <p className='text-text-200 text-center mb-10'>
        Experience the future of learning. Discover, grow, and excel with ScholaNet.
      </p>
      <Separator className='bg-primary-100 my-5' />
      <Separator className='bg-primary-100 opacity-70 mb-5' />
      <Separator className='bg-primary-100 opacity-40 mb-5' />
      <Separator className='bg-primary-100 opacity-20 mb-5' />
      <Separator className='bg-primary-100 opacity-5 mb-10' />

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
  )
}

export default BenefictsSection

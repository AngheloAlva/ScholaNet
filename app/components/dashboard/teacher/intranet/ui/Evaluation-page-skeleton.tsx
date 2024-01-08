import { Skeleton } from '@/app/components/ui/skeleton'

function EvaluationPageSkeleton (): React.ReactElement {
  return (
    <>
      <Skeleton className='w-full h-10 bg-bg-300 mb-4' />
      <Skeleton className='w-full h-20 bg-bg-300 mb-4' />
      <Skeleton className='w-full h-10 bg-text-100 mb-10' />
      <Skeleton className='w-full h-32 bg-bg-300 mb-10 ' />
      <Skeleton className='w-full h-96 bg-bg-300' />
    </>
  )
}

export default EvaluationPageSkeleton

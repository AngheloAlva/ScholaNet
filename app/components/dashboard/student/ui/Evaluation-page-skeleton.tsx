import { Skeleton } from '@/app/components/ui/skeleton'

function EvaluationPageSkeleton (): React.ReactElement {
  return (
    <>
      <Skeleton className='w-full h-8 mb-2' />
      <Skeleton className='w-full h-8 mb-5' />
      <Skeleton className='w-full h-40' />
    </>
  )
}

export default EvaluationPageSkeleton

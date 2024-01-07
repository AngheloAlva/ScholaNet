import { Skeleton } from '@/app/components/ui/skeleton'
import type { Course } from '@/types/course/course'

function TitleSection (
  { course }: { course: Course | undefined }
): React.ReactElement {
  return (
    <div className='flex flex-col items-start justify-center w-full h-full gap-2'>
      {
        ((course) != null)
          ? (
            <>
              <h1 className='text-3xl text-accent-100 font-bold'>{course.title}</h1>
              <p className='text-lg font-semibold'>{course.description}</p>
            </>
            )
          : <>
              <Skeleton className='w-full h-9' />
              <Skeleton className='w-full h-14 md:h-7' />
            </>
      }
    </div>
  )
}

export default TitleSection

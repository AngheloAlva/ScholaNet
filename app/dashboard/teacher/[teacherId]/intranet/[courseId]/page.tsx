'use client'

import useCourseInstanceById from '@/hooks/useCourseInstanceById'

import EvaluationSection from '@/components/dashboard/teacher/intranet/Evaluations-section'
import MaterialsSection from '@/components/dashboard/teacher/intranet/Materials-section'
import TitleSection from '@/components/dashboard/teacher/intranet/Title-section'
import { Separator } from '@/components/ui/separator'
import BackButton from '@/components/Back-button'

function CourseInstanceByIdPage (
  { params }: { params: { teacherId: string, courseId: string } }
): React.ReactElement {
  const { courseInstance, evaluations, materials } = useCourseInstanceById(params.courseId)

  return (
    <main className='px-5 mb-20'>
      <BackButton href={`/dashboard/teacher/${params.teacherId}/intranet`} />

      <TitleSection course={courseInstance?.course} />

      <Separator className='my-6' />

      <div className='flex flex-col'>
        <EvaluationSection
          teacherId={params.teacherId}
          courseId={params.courseId}
          evaluations={evaluations}
        />

        <Separator className='my-6'/>

        <MaterialsSection
          teacherId={params.teacherId}
          courseId={params.courseId}
          materials={materials}
        />
      </div>
    </main>
  )
}

export default CourseInstanceByIdPage

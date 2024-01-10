'use client'

import useCourseInstanceById from '@/app/hooks/useCourseInstanceById'

import TitleSection from '@/app/components/dashboard/teacher/intranet/page/Title-section'
import { Separator } from '@/app/components/ui/separator'
import BackButton from '@/app/components/ui/Back-button'
import EvaluationSection from '@/app/components/dashboard/student/page/Evaluation-section'
import MaterialsSection from '@/app/components/dashboard/student/page/Material-section'

function CourseInstanceByIdPage (
  { params }: { params: { studentId: string, courseId: string } }
): React.ReactElement {
  const {
    materials,
    evaluations,
    courseInstance
  } = useCourseInstanceById(params.courseId)

  return (
    <main className='px-5 mb-20'>
      <BackButton href={`/dashboard/student/${params.studentId}/intranet`} />
      <TitleSection course={courseInstance?.course} />

      <Separator className='my-6' />

      <div className='flex flex-col'>
        <EvaluationSection evaluations={evaluations} studentId={params.studentId} />
        <Separator className='my-6'/>
        <MaterialsSection materials={materials} />
      </div>
    </main>
  )
}

export default CourseInstanceByIdPage

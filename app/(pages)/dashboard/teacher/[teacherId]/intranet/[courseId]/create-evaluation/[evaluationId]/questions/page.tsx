'use client'

import CreateQuestionForm from '@/app/components/dashboard/teacher/intranet/forms/Create-question-form'

function CreateQuestionPage (
  { params }: { params: { teacherId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  return (
    <div className='px-5 mb-20 py-10'>
      <CreateQuestionForm teacherId={params.teacherId} evaluationId={params.evaluationId} courseInstanceId={params.courseId} />
    </div>
  )
}

export default CreateQuestionPage

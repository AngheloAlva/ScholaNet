'use client'

import EditEvaluationForm from '@/app/components/dashboard/teacher/intranet/forms/Edit-evaluation-form'
import BackButton from '@/app/components/ui/Back-button'
import { Skeleton } from '@/app/components/ui/skeleton'
import useEvaluationById from '@/app/hooks/useEvaluationById'

function EvaluationByIdPage (
  { params }: { params: { teacherId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  const { evaluation, questions, reloadQuestions } = useEvaluationById(params.evaluationId)

  return (
    <main className='px-5 mb-20 pb-8'>
      <BackButton href={`/dashboard/teacher/${params.teacherId}/intranet/${params.courseId}`} />
      {
        evaluation != null
          ? <h1 className='text-2xl font-bold mb-4'>Evaluation {evaluation.title}</h1>
          : <Skeleton className='w-full h-8 mb-4 bg-bg-300' />

      }
      {
        (evaluation != null && questions != null)
          ? <EditEvaluationForm
              evaluation={evaluation}
              questions={questions}
              reloadQuestions={reloadQuestions}
              courseInstanceId={params.courseId}
              teacherId={params.teacherId}
            />
          : <>
              <Skeleton className='w-full h-80 bg-bg-300 mb-4' />
              <Skeleton className='w-full h-80 bg-bg-300' />
            </>
      }
    </main>
  )
}

export default EvaluationByIdPage

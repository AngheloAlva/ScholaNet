'use client'

import useEvaluationById from '@/app/hooks/useEvaluationById'

import EvaluationPageSkeleton from '@/app/components/dashboard/teacher/intranet/ui/Evaluation-page-skeleton'
import EditEvaluationForm from '@/app/components/dashboard/teacher/intranet/forms/Edit-evaluation-form'
import BackButton from '@/app/components/ui/Back-button'
import { Skeleton } from '@/app/components/ui/skeleton'

function EvaluationByIdPage (
  { params }: { params: { teacherId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  const { evaluation, questions, reloadQuestions, reloadEvaluation } = useEvaluationById(params.evaluationId)

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
              reloadEvaluation={reloadEvaluation}
              courseInstanceId={params.courseId}
              teacherId={params.teacherId}
            />
          : <EvaluationPageSkeleton />
      }
    </main>
  )
}

export default EvaluationByIdPage

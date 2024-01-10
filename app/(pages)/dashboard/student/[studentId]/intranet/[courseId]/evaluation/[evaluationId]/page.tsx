'use client'

import { calculateDaysLeft } from '@/app/lib/calculateDaysLeft'
import useEvaluationById from '@/app/hooks/useEvaluationById'
import { startEvaluation } from '@/api/course/evaluation'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import EvaluationPageSkeleton from '@/app/components/dashboard/student/ui/Evaluation-page-skeleton'
import { Card, CardContent, CardHeader } from '@/app/components/ui/card'
import { useToast } from '@/app/components/ui/use-toast'
import BackButton from '@/app/components/ui/Back-button'
import { Button } from '@/app/components/ui/button'

function EvaluationPage (
  { params }: { params: { studentId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  const { evaluation, isLoading } = useEvaluationById(params.evaluationId)
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(false)
  const pathName = usePathname()
  const { toast } = useToast()
  const router = useRouter()

  const today = new Date()
  const daysLeft = calculateDaysLeft(evaluation?.dueDate ?? '')

  const handleStartEvaluation = async (): Promise<void> => {
    try {
      await startEvaluation(params.evaluationId, params.studentId)
      setIsEvaluationStarted(true)
      router.push(`${pathName}/do-evaluation`)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.'
      })
    }
  }

  if (isLoading) {
    return (
      <div className='px-5 mb-20'>
        <BackButton href={`/dashboard/student/${params.studentId}/intranet/${params.courseId}`} />
        <EvaluationPageSkeleton />
      </div>
    )
  }

  return (
    <div className='px-5 mb-20'>
      <BackButton href={`/dashboard/student/${params.studentId}/intranet/${params.courseId}`} />

      <h1 className='text-2xl underline font-bold mb-2'>{evaluation?.title}</h1>
      <p className='text-text-100'>{evaluation?.description}</p>

      <Card className='mt-5'>
        <CardHeader>
          <p className='text-text-100'>
            <strong>Due date: </strong> {daysLeft} days left
          </p>
          <p className='text-text-100'>
            <strong>Type: </strong>{evaluation?.type}
          </p>
        </CardHeader>

        <CardContent className='w-full flex items-center justify-center'>
          {
            today < new Date(evaluation?.dueDate ?? '') && !isEvaluationStarted && evaluation?.type === 'online'
              ? (
                  <Button
                    className='bg-accent-100'
                    onClick={() => {
                      void handleStartEvaluation()
                    }}
                  >
                    Do evaluation
                  </Button>
                )
              : (
                  <Button disabled variant={'outline'} className='text-red-500 font-semibold text-center disabled:opacity-90'>
                    Due date Expired
                  </Button>
                )
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default EvaluationPage

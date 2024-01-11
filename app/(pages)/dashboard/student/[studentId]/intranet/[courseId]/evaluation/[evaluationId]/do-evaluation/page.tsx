'use client'

import { addSubmission } from '@/api/course/evaluation'
import QuestionsSection from '@/app/components/dashboard/student/page/Questions-section'
import { Button } from '@/app/components/ui/button'
import { Skeleton } from '@/app/components/ui/skeleton'
import { useToast } from '@/app/components/ui/use-toast'
import useEvaluationById from '@/app/hooks/useEvaluationById'
import useTimer from '@/app/hooks/useTimer'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function DoEvaluationPage (
  { params }: { params: { studentId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  const { evaluation, isLoading, questions } = useEvaluationById(params.evaluationId)
  const [answers, setAnswers] = useState<Array<{ question: string, answer: string[] }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    toast({
      title: 'Evaluation started. You have only one chance to submit it.',
      description: 'Don\'t close this page until you finish the evaluation.'
    })
  }, [])

  const getStartTime = (): Date => {
    if (!isLoading && (evaluation != null) && evaluation.submissions.length > 0) {
      const currentSubmission = evaluation.submissions.find((sub) =>
        sub.student === params.studentId
      )

      return (currentSubmission != null)
        ? new Date(currentSubmission.startTime)
        : new Date()
    }

    return new Date()
  }

  const duration = evaluation?.duration ?? 0
  const timeLeft = useTimer(getStartTime, duration)

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleAnswerChange = (questionId: string, answer: string): void => {
    setAnswers(prevAnswers => {
      const updatedAnswers = prevAnswers.map(ans =>
        ans.question === questionId ? { ...ans, answer: [answer] } : ans
      )

      if (updatedAnswers.find(ans => ans.question === questionId) == null) {
        updatedAnswers.push({ question: questionId, answer: [answer] })
      }

      return updatedAnswers
    })
  }

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true)

    const unansweredQuestions = questions.filter(question => {
      const answer = answers.find(ans => ans.question === question._id)

      return answer == null
    })

    if (unansweredQuestions.length > 0) {
      setIsSubmitting(false)
      toast({
        title: 'You have unanswered questions',
        description: 'Please answer all the questions before submitting.'
      })
      return
    }

    try {
      const endTime = new Date().toISOString()

      await addSubmission({
        id: params.evaluationId,
        submission: {
          endTime,
          student: params.studentId,
          answers
        }
      })
      toast({
        title: 'Evaluation submitted',
        description: 'Your evaluation has been submitted successfully.',
        duration: 3000
      })
      router.push(`/dashboard/student/${params.studentId}/intranet/${params.courseId}`)
    } catch (error) {
      console.log(error)
      toast({
        title: 'An error occurred',
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.',
        duration: 3000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='px-5 mb-20'>
      {isLoading
        ? <Skeleton />
        : (
          <>
            <div className='flex justify-between items-center mt-5 flex-wrap mb-2'>
              <h1 className='text-2xl underline font-bold'>{evaluation?.title}</h1>
              <p className='text-text-100'>
                <strong>Time left: </strong> {formatTime(timeLeft)}
              </p>
            </div>

            <QuestionsSection
              questions={questions}
              handleAnswerChange={handleAnswerChange}
            />
          </>
          )}

      <div className='flex justify-end mt-5'>
        <Button
          className='bg-accent-100 text-white w-full mt-10'
          onClick={() => {
            void handleSubmit()
          }}
        >
          {
            isSubmitting
              ? <div className='lds-ring'><div /><div /><div /><div /></div>
              : 'Submit'
          }
        </Button>
      </div>
    </div>
  )
}

export default DoEvaluationPage

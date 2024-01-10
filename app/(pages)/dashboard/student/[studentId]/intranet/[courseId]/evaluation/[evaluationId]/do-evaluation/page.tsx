'use client'

import { addSubmission } from '@/api/course/evaluation'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Textarea } from '@/app/components/ui/textarea'
import useEvaluationById from '@/app/hooks/useEvaluationById'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function DoEvaluationPage (
  { params }: { params: { studentId: string, courseId: string, evaluationId: string } }
): React.ReactElement {
  const { evaluation, isLoading, questions } = useEvaluationById(params.evaluationId)
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [answers, setAnswers] = useState<Array<{ question: string, answer: string[] }>>([])

  useEffect(() => {
    if (!isLoading && ((evaluation?.duration) != null)) {
      setTimeLeft(evaluation.duration * 60)
    }
  }, [evaluation, isLoading])

  useEffect(() => {
    if ((evaluation != null) && !isLoading) {
      const startTime = new Date(evaluation.submissions[0].startTime)
      const durationInMilliseconds = evaluation.duration * 60000
      const currentTime = new Date()
      const timeElapsed = currentTime.getTime() - startTime.getTime()
      const remainingTime = durationInMilliseconds - timeElapsed

      if (remainingTime > 0) {
        setTimeLeft(Math.floor(remainingTime / 1000))
      } else {
        void handleSubmit()
      }
    }
  }, [evaluation, isLoading])

  useEffect(() => {
    if (timeLeft <= 0) {
      void handleSubmit()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => { clearTimeout(timer) }
  }, [timeLeft])

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
      router.push(`/dashboard/student/${params.studentId}/intranet/${params.courseId}`)
    } catch (error) {
      console.log(error)
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

            <div className='flex flex-col gap-6'>
              {
                questions.map((question, index) => (
                  <div key={question._id}>
                    <h3>
                      <strong>Question {index + 1}:</strong> {question.questionText}
                    </h3>

                    {question.questionType === 'multipleChoice' && (
                        <div>
                          {
                            question.options.map((option, index) => (
                              <div key={index} className='flex items-center gap-2'>
                                <Input
                                  type='radio'
                                  className='w-auto'
                                  name={question._id}
                                  value={option}
                                  id={`${question._id}-${option}`}
                                  onChange={(e) => {
                                    handleAnswerChange(question._id, e.target.value)
                                  }}
                                />
                                <Label htmlFor={`${question._id}-${option}`}>{option}</Label>
                              </div>
                            ))
                          }
                        </div>
                    )}

                    {question.questionType === 'trueFalse' && (
                        <div className='flex gap-6'>
                          <div className='flex items-center gap-2'>
                            <Input
                              type='radio'
                              name={question._id}
                              id={`${question._id}-true`}
                              className='w-auto'
                              onChange={(e) => {
                                handleAnswerChange(question._id, e.target.value)
                              }}
                            />
                            <Label htmlFor={`${question._id}-true`}>True</Label>
                          </div>

                          <div className='flex items-center gap-2'>
                            <Input
                              type='radio'
                              name={question._id}
                              id={`${question._id}-false`}
                              className='w-auto'
                              onChange={(e) => {
                                handleAnswerChange(question._id, e.target.value)
                              }}
                            />
                            <Label htmlFor={`${question._id}-false`}>False</Label>
                          </div>
                        </div>
                    )}

                    {question.questionType === 'shortAnswer' && (
                        <div>
                          <Textarea
                            name={question._id}
                            id={question._id}
                            placeholder='Short Answer'
                            onChange={(e) => {
                              handleAnswerChange(question._id, e.target.value)
                            }}
                          />
                        </div>
                    )}
                  </div>
                ))
              }
            </div>
          </>
          )}

      <div className='flex justify-end mt-5'>
        <Button
          className='bg-accent-100 text-white w-full mt-10'
          onClick={() => {
            void handleSubmit()
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default DoEvaluationPage

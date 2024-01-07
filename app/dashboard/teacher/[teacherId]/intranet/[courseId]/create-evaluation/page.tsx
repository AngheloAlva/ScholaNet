/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { createEvaluation } from '@/api/course/evaluation'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { useState } from 'react'

import CreateEvaluationForm from '@/components/dashboard/teacher/intranet/forms/Create-evaluation-form'
import { useToast } from '@/components/ui/use-toast'
import BackButton from '@/components/Back-button'

import type { createEvaluationSchema } from '@/lib/createEvaluationSchema'
import type { z } from 'zod'

function CreateEvaluationPage (
  { params }: { params: { teacherId: string, courseId: string } }
): React.ReactElement {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (values: z.infer<typeof createEvaluationSchema>): Promise<void> => {
    setIsLoading(true)
    const formattedDueDate = format(values.dueDate, 'MM-dd-yyyy')

    try {
      const evaluation = await createEvaluation({
        title: values.title,
        description: values.description,
        courseInstance: params.courseId,
        dueDate: formattedDueDate,
        type: values.type
      })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully created a new evaluation. We are redirecting you.'
      })

      if (values.type === 'online') {
        router.push(`/dashboard/teacher/${params.teacherId}/intranet/${params.courseId}/create-evaluation/${evaluation._id}/questions`)
      } else {
        router.push(`/dashboard/teacher/${params.teacherId}/intranet/${params.courseId}`)
      }
    } catch (error) {
      toast({
        title: 'Error',
        duration: 3000,
        variant: 'destructive',
        description: (error as any)?.response?.data?.errors.map((error: any) => (
          <p key={error.path}>
            {error.path}: {error.value} - {error.msg}
          </p>
        )) ?? 'An error occurred. Please try again later.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-5 mb-20'>
      <header>
        <BackButton href={`/dashboard/teacher/${params.teacherId}/intranet/${params.courseId}`} />

        <h1 className='text-3xl font-bold text-primary-100'>Create evaluation</h1>
      </header>

      <main className='flex flex-col'>
        <CreateEvaluationForm onSubmit={onSubmit} isLoading={isLoading} />
      </main>
    </div>
  )
}

export default CreateEvaluationPage

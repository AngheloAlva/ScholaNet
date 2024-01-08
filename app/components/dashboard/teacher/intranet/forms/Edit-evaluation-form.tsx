/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import CreateQuestionForm from './Create-question-form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import SubmitButton from '@/app/components/forms/Submit-button'
import { updateEvaluation } from '@/api/course/evaluation'
import { Separator } from '@/app/components/ui/separator'
import { useToast } from '@/app/components/ui/use-toast'
import { Textarea } from '@/app/components/ui/textarea'
import { Input } from '@/app/components/ui/input'
import ViewQuestion from '../ui/View-question'

import type { Evaluation } from '@/types/course/evaluation'
import type { Question } from '@/types/course/question'
import DueDateEditSelect from './Due-date-edit-select'

interface EditEvaluationFormProps {
  evaluation: Evaluation
  questions: Question[]
  teacherId: string
  courseInstanceId: string
  reloadQuestions: () => Promise<void>
  reloadEvaluation: () => Promise<void>
}

function EditEvaluationForm ({
  evaluation, questions, reloadQuestions, teacherId, courseInstanceId, reloadEvaluation
}: EditEvaluationFormProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const initialValues = {
    title: evaluation.title,
    description: evaluation.description,
    dueDate: (evaluation.dueDate.length > 0)
      ? new Date(evaluation.dueDate)
      : new Date()
  }
  const { register, handleSubmit, control } = useForm({
    defaultValues: initialValues
  })

  const onSubmit = async (data: typeof initialValues): Promise<void> => {
    setIsLoading(true)
    try {
      await updateEvaluation({
        id: evaluation._id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate.toString()
      })
      toast({
        title: 'Evaluation updated',
        description: 'The evaluation has been updated successfully',
        duration: 3000
      })
      await reloadEvaluation()
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'Something went wrong',
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input {...register('title')} />
        <Textarea {...register('description')} />
        <DueDateEditSelect control={control} />
        <SubmitButton isLoading={isLoading} text='Update Evaluation' />

      </form>
      <div>
        <h3 className='text-2xl font-bold mb-2'>Questions of the evaluation</h3>
        {
          questions.length === 0
            ? <p className='text-xl text-muted-foreground font-semibold mb-4'>There are no questions yet</p>
            : <ViewQuestion questions={questions} evaluationId={evaluation._id} reloadQuestions={reloadQuestions} />

        }
      </div>

      <Separator />

      <div>
        <h3 className='text-2xl font-bold'>Add Question</h3>
        <h3 className='text-xl text-muted-foreground font-semibold mb-4'>
          If you want to add a new question, you can do it here.
        </h3>
        <CreateQuestionForm evaluationId={evaluation._id} courseInstanceId={courseInstanceId} teacherId={teacherId} />
      </div>
    </div>
  )
}

export default EditEvaluationForm

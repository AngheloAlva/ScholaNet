/* eslint-disable @typescript-eslint/no-misused-promises */
import SubmitButton from '@/app/components/forms/Submit-button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import type { Evaluation } from '@/types/course/evaluation'
import { useForm } from 'react-hook-form'
import type { Question } from '@/types/course/question'
import CreateQuestionForm from './Create-question-form'
import ViewQuestion from '../ui/View-question'

interface EditEvaluationFormProps {
  evaluation: Evaluation
  questions: Question[]
  reloadData: () => Promise<void>
}

function EditEvaluationForm ({
  evaluation, questions, reloadData
}: EditEvaluationFormProps): React.ReactElement {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: evaluation.title,
      description: evaluation.description,
      dueDate: evaluation.dueDate
    }
  })

  const onSubmit = (data: any): void => {
    console.log(data)
  }

  return (
    <div className='flex flex-col gap-10'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input {...register('title')} />
        <Textarea {...register('description')} />

        <div>
          <h3 className='text-2xl font-bold mb-2'>Questions</h3>
          <ViewQuestion questions={questions} evaluationId={evaluation._id} reloadData={reloadData} />
        </div>

        <SubmitButton isLoading={false} text='Update Evaluation' />
      </form>

      <div>
        <p>
          If you want to add a new question, you can do it here.
        </p>
        <CreateQuestionForm evaluationId={evaluation._id} courseInstanceId={''} teacherId={''} />
      </div>
    </div>
  )
}

export default EditEvaluationForm

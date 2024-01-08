/* eslint-disable @typescript-eslint/no-misused-promises */
import SubmitButton from '@/app/components/forms/Submit-button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import type { Evaluation } from '@/types/course/evaluation'
import { useForm } from 'react-hook-form'
import type { Question } from '@/types/course/question'
import CreateQuestionForm from './Create-question-form'
import ViewQuestion from '../ui/View-question'
import { Separator } from '@/app/components/ui/separator'

interface EditEvaluationFormProps {
  evaluation: Evaluation
  questions: Question[]
  teacherId: string
  courseInstanceId: string
  reloadQuestions: () => Promise<void>
}

function EditEvaluationForm ({
  evaluation, questions, reloadQuestions, teacherId, courseInstanceId
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
        <SubmitButton isLoading={false} text='Update Evaluation' />

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

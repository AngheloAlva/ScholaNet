/* eslint-disable @typescript-eslint/no-misused-promises */

import { createQuestionSchema } from '@/app/lib/createQuestionSchema'
import { updateEvaluation } from '@/api/course/evaluation'
import { useFieldArray, useForm } from 'react-hook-form'
import { createQuestions } from '@/api/course/question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Separator } from '@/app/components/ui/separator'
import { useToast } from '@/app/components/ui/use-toast'
import OptionsFieldArray from './Options-field-array'
import { Button } from '@/app/components/ui/button'
import TypeSelectField from './Type-select-field'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

import type { SimpleQuestion } from '@/types/course/question'

interface CreateQuestionFormProps {
  teacherId: string
  evaluationId: string
  courseInstanceId: string
}

function CreateQuestionForm ({
  teacherId, evaluationId, courseInstanceId
}: CreateQuestionFormProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { control, handleSubmit, register, setValue } = useForm({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      questions: [{ questionText: '', options: [''], points: 0, questionType: '', correctAnswer: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  })

  const onSubmit = async (data: { questions: SimpleQuestion[] }): Promise<void> => {
    setIsLoading(true)

    try {
      const totalScore = data.questions.reduce((acc, curr) => acc + Number(curr.points), 0)
      const newQuestions = await createQuestions({
        evaluation: evaluationId,
        questions: data.questions
      })
      toast({
        title: 'Questions created',
        description: 'Adding questions to the evaluation... Please wait',
        duration: 2000
      })

      await updateEvaluation({
        id: evaluationId,
        totalScore,
        questions: newQuestions.map((question) => question._id)
      })
      toast({
        title: 'Evaluation updated',
        description: 'Redirecting to intranet...',
        duration: 2000
      })
      router.push(`/dashboard/teacher/${teacherId}/intranet/${courseInstanceId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      router.push(`/dashboard/teacher/${teacherId}/intranet/${courseInstanceId}`)
    }
  }

  return (
    <div className='relative'>
      {isLoading && (
        <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white rounded-lg p-4 flex flex-col gap-4'>
            <h3 className='text-xl font-semibold text-text-100'>Creating questions...</h3>
            <p className='text-text-100'>Please wait</p>
          </div>
      </div>
      ) }
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 flex flex-col'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 lg:grid-cols-3'>
          {fields.map((field, index) => (
            <fieldset key={field.id} className='flex flex-col gap-4 rounded-lg border bg-card text-card-foreground shadow-sm p-2'>
              <h3 className='text-xl font-semibold text-text-100 mt-1 text-center underline'>
                Question {index + 1}
              </h3>
              <div>
                <Label>Question Text</Label>
                <Input {...register(`questions.${index}.questionText`)} placeholder='Question Text' />
              </div>
              <TypeSelectField control={control} index={index} />

              <div className='flex flex-col gap-4 my-2'>
                <Separator />
                <div className='flex justify-between w-full'>
                  <Label>Options</Label>
                  <label className='text-sm text-text-200'>* Click in radio button to select correct answer</label>
                </div>
                <OptionsFieldArray
                  questionIndex={index}
                  setValue={setValue}
                />
                <Separator />
              </div>

              <div>
                <Label>Points</Label>
                <Input type="number" {...register(`questions.${index}.points`)} placeholder='0' />
              </div>

              <Button type='button' variant={'destructive'} onClick={() => { remove(index) }}>
                Delete question
              </Button>
            </fieldset>
          ))}
        </div>

        <Button
          type='button'
          variant={'secondary'}
          onClick={() => {
            append({ questionText: '', points: 0, questionType: '', options: [''], correctAnswer: '' })
          }}
        >
          Add question
        </Button>

        <Button type='submit'>
          Submit questions
        </Button>
      </form>
    </div>
  )
}

export default CreateQuestionForm

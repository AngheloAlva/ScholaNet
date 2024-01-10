/* eslint-disable @typescript-eslint/no-misused-promises */

import { createEvaluationSchema } from '@/app/lib/createEvaluationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import SelectField from '@/app/components/forms/Select-form-field'
import GenericFormField from '@/app/components/forms/Form-field'
import SubmitButton from '@/app/components/forms/Submit-button'
import { Label } from '@/app/components/ui/label'
import { Form } from '@/app/components/ui/form'
import DueDatePicker from './Due-date-picker'

import type { z } from 'zod'

interface CreateEvaluationFormProps {
  onSubmit: (values: z.infer<typeof createEvaluationSchema>) => Promise<void>
  isLoading: boolean
}

function CreateEvaluationForm (
  { onSubmit, isLoading }: CreateEvaluationFormProps
): React.ReactElement {
  const form = useForm<z.infer<typeof createEvaluationSchema>>({
    resolver: zodResolver(createEvaluationSchema)
  })
  const selectOptions = ['paper', 'online', 'presentation', 'project']

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-2'>
        <GenericFormField control={form.control} name='title' label='Title' placeholder='title' />
        <GenericFormField control={form.control} name='description' label='Description' placeholder='description' />
        <GenericFormField control={form.control} name='maxAttempts' label='Max attempts' placeholder='max attempts' type='number' />
        <GenericFormField control={form.control} name='duration' label='Duration' placeholder='duration' type='number' />

        <div className='space-y-2'>
          <Label>Type</Label>
          <SelectField
            textTransform='capitalize'
            options={selectOptions}
            placeholder='Type'
            form={form}
            name='type'
          />
        </div>

        <DueDatePicker form={form} />

        <SubmitButton text='Create Evaluation' isLoading={isLoading} />
      </form>
    </Form>
  )
}

export default CreateEvaluationForm

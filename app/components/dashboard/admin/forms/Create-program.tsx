import { createProgramSchema } from '@/app/lib/createProgramSchema'
import { createProgram } from '@/api/scholanet/program'
import { useState } from 'react'

import GenericFormField from '@/app/components/forms/Form-field'
import GenericForm from '@/app/components/forms/Generic-form'
import { useToast } from '@/app/components/ui/use-toast'
import SubmitButton from '../../../forms/Submit-button'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components/ui/dialog'

import type { z } from 'zod'

function CreateProgram (
  { onProgramCreated }: { onProgramCreated: () => Promise<void> }
): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const defaultValues = {
    name: '',
    description: ''
  }

  const onSubmit = async (values: z.infer<typeof createProgramSchema>): Promise<void> => {
    try {
      setIsLoading(true)
      await createProgram({ name: values.name, description: values.description })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully created a new program.'
      })
      await onProgramCreated()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: 'Error',
        duration: 3000,
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.'
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Program</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Program</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new program.
          </DialogDescription>
        </DialogHeader>
        <div>
          <GenericForm schema={createProgramSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
            <GenericFormField name='name' label='Name' placeholder='Name' />
            <GenericFormField name='description' label='Description' placeholder='Description' />

            <SubmitButton text='Create program' isLoading={isLoading} />
          </GenericForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProgram

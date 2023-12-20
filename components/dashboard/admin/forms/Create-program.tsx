import { createProgramSchema } from '@/lib/createProgramSchema'
import { useState } from 'react'

import AuthFormField from '@/components/Form-field'
import { createProgram } from '@/api/scholanet/program'
import { useToast } from '@/components/ui/use-toast'
import GenericForm from '@/components/Generic-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

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
            <AuthFormField name='name' label='Name' placeholder='Name' />
            <AuthFormField name='description' label='Description' placeholder='Description' />

            <DialogClose>
              <Button type='submit' className='w-full mt-2' disabled={isLoading}>
                {
                  isLoading
                    ? <div className='lds-ring'><div /><div /><div /><div /></div>
                    : 'Create Program'
                }
              </Button>
            </DialogClose>
          </GenericForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProgram

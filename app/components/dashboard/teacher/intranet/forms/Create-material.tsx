import { createMaterialSchema } from '@/app/lib/createMaterialSchema'
import { createMaterial } from '@/api/course/material'
import { useState } from 'react'

import GenericFormField from '@/app/components/forms/Form-field'
import GenericForm from '@/app/components/forms/Generic-form'
import SubmitButton from '../../../../forms/Submit-button'
import { useToast } from '@/app/components/ui/use-toast'
import TypeUploadButton from '../ui/Type-upload-button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import TypeSelect from './Type-select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components/ui/dialog'

import type { z } from 'zod'

function CreateMaterialForm (
  { courseInstanceId }: { courseInstanceId: string }
): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [type, setType] = useState<string>('pdf')
  const [url, setURL] = useState<string>('')
  const { toast } = useToast()
  const defaultValues = {
    title: '',
    description: ''
  }

  const handleUploadFile = (
    res: Array<{ serverData: { fileUrl: { url: any } } }>
  ): void => {
    const uploadedFile = res[0].serverData.fileUrl.url
    setURL(uploadedFile)
  }

  const handleTypeChange = (value: string): void => {
    setType(value)
  }

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setURL(event.target.value)
  }

  const onSubmit = async (values: z.infer<typeof createMaterialSchema>): Promise<void> => {
    setIsLoading(true)

    try {
      if (url.length === 0) {
        toast({
          title: 'Error',
          duration: 3000,
          description: 'You must upload a file or add a link'
        })
      }

      await createMaterial({
        ...values,
        type,
        url,
        courseInstance: courseInstanceId
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        duration: 3000,
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className='border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2'>
        Add Material
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Material</DialogTitle>
          <DialogDescription>Fill the form to create a new material</DialogDescription>
        </DialogHeader>

        <GenericForm defaultValues={defaultValues} onSubmit={onSubmit} schema={createMaterialSchema}>
          <GenericFormField label="Title" name="title" placeholder="Sums of vectors" />
          <GenericFormField label="Description" name="description" placeholder="Sums of vectors" />
          <TypeSelect onChange={handleTypeChange} value={type} />
          {
            type === 'link' && (
              <>
                <Label>URL</Label>
                <Input name="url" placeholder="https://example.com" onChange={handleURLChange} />
              </>
            )
          }
          <TypeUploadButton type={type} handleUploadFile={handleUploadFile} />

          <SubmitButton isLoading={isLoading} text='Create Material' />
        </GenericForm>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMaterialForm

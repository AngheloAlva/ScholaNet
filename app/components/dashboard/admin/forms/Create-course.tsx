import { createCourseSchema } from '@/app/lib/createCourseSchema'
import { UploadButton } from '@/utils/uploadthing'
import { createCourse } from '@/api/course/course'
import { useState } from 'react'

import GenericFormField from '@/app/components/forms/Form-field'
import GenericForm from '@/app/components/forms/Generic-form'
import { useToast } from '@/app/components/ui/use-toast'
import SubmitButton from '../../../forms/Submit-button'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import ProgramSelect from './Program-select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/components/ui/dialog'

import type { z } from 'zod'

import '@uploadthing/react/styles.css'

function CreateCourse (
  { onProgramCreated }: { onProgramCreated: () => Promise<void> }
): React.ReactElement {
  const [imageURL, setImageURL] = useState<string>('')
  const [programId, setProgramId] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const defaultValues = {
    title: '',
    description: '',
    href: ''
  }

  const onSubmit = async (values: z.infer<typeof createCourseSchema>): Promise<void> => {
    setIsLoading(true)

    if (imageURL.length === 0) {
      toast({
        title: 'Error',
        duration: 3000,
        variant: 'destructive',
        description: 'Please upload an image.'
      })
      setIsLoading(false)
      return
    }
    if (programId.length === 0) {
      toast({
        title: 'Error',
        duration: 3000,
        variant: 'destructive',
        description: 'Please select a program.'
      })
      setIsLoading(false)
      return
    }

    values.image = imageURL
    values.program = programId

    try {
      await createCourse({
        title: values.title,
        description: values.description,
        program: values.program,
        image: values.image,
        href: values.href
      })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully created a new course.'
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

  const handleImageUpload = (
    res: Array<{ serverData: { fileUrl: { url: any } } }>
  ): void => {
    const uploadedImageUrl = res[0].serverData.fileUrl.url
    setImageURL(uploadedImageUrl)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>
            Fill the form to create a new course.
          </DialogDescription>
        </DialogHeader>

        <GenericForm schema={createCourseSchema} defaultValues={defaultValues} onSubmit={onSubmit}>
          <GenericFormField name="title" label="Title" placeholder='Title' />
          <GenericFormField name="description" label="Description" placeholder='Description...' />
          <GenericFormField name="href" label="Href" placeholder='/dashboard/admin/course' />
          <div>
            <Label>Image</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUpload}
              onUploadError={(error: Error) => {
                toast({
                  title: 'Error',
                  duration: 3000,
                  description: error.message
                })
              }}
            />
          </div>
          <div>
            <Label>Program</Label>
            <ProgramSelect value={programId} onChange={setProgramId} />
          </div>

          <SubmitButton text='Create course' isLoading={isLoading} />
        </GenericForm>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCourse

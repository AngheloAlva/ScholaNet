import { createCourseSchema } from '@/lib/createCourseSchema'
import { UploadButton } from '@/utils/uploadthing'
import { createCourse } from '@/api/course/course'
import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import GenericForm from '@/components/Generic-form'
import AuthFormField from '@/components/Form-field'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import ProgramSelect from './Program-select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import '@uploadthing/react/styles.css'
import type { z } from 'zod'

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
          <AuthFormField name="title" label="Title" placeholder='Title' />
          <AuthFormField name="description" label="Description" placeholder='Description...' />
          <AuthFormField name="href" label="Href" placeholder='/dashboard/admin/course' />
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

          <Button type='submit' className='w-full mt-2' disabled={isLoading}>
            {
              isLoading
                ? <div className='lds-ring'><div /><div /><div /><div /></div>
                : 'Create Course'
            }
          </Button>
        </GenericForm>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCourse

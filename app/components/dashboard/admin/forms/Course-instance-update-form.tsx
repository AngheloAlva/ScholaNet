/* eslint-disable @typescript-eslint/no-misused-promises */

import { updateCourseInstance } from '@/api/course/course-instance'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Separator } from '@/app/components/ui/separator'
import SubmitButton from '../../../forms/Submit-button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import TeacherSelect from './Teacher-select'

function CourseInstanceUpdateForm ({
  courseInstanceId
}: { courseInstanceId: string }): React.ReactElement {
  const router = useRouter()
  const [teacher, setTeacher] = useState('')
  const [classroom, setClassroom] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const updatedData = {
      id: courseInstanceId,
      classroom: classroom === '' ? undefined : classroom,
      teacher: teacher === '' ? undefined : teacher
    }

    await updateCourseInstance(updatedData)
    router.push('/dashboard/admin/course-instances')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update course instance</CardTitle>
        <CardDescription>Only the fields you fill in will be updated</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <div>
            <Label htmlFor="classroom">Classroom</Label>
            <Input
              id='classroom'
              value={classroom}
              placeholder='Classroom 1, floor 1'
              onChange={(e) => { setClassroom(e.target.value) }}
            />
          </div>
          <div>
            <TeacherSelect label='Teacher' value={teacher} onChange={setTeacher} />
          </div>

          <Separator className='mt-2' />
          <SubmitButton isLoading={false} text='Update' />
        </form>
      </CardContent>
    </Card>
  )
}

export default CourseInstanceUpdateForm

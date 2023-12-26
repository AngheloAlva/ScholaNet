/* eslint-disable @typescript-eslint/no-misused-promises */

import { dayOptions, durationnOptions, startTimes } from '@/data/consts'
import { updateCourseInstance } from '@/api/course/course-instance'
import { calculateEndTime } from '@/helpers/calculateEndTime'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SimpleSelectField from './Simple-select-field'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TeacherSelect from './Teacher-select'
import SubmitButton from './Submit-button'

function CourseInstanceUpdateForm ({
  courseInstanceId
}: { courseInstanceId: string }): React.ReactElement {
  const { toast } = useToast()
  const router = useRouter()
  const [schedules, setSchedules] = useState([{
    day: '',
    startTime: '',
    endTime: '',
    duration: ''
  }])
  const [teacher, setTeacher] = useState('')
  const [classroom, setClassroom] = useState('')

  const handleAddSchedule = (): void => {
    setSchedules([...schedules, { day: '', startTime: '', endTime: '', duration: '' }])
  }

  const handleRemoveSchedule = (index: number): void => {
    const newSchedule = schedules.filter((_, i) => i !== index)
    setSchedules(newSchedule)
  }

  const handleScheduleChange = (index: number, field: string, value: string): void => {
    const newSchedule = schedules.map((schedule, i) =>
      i === index ? { ...schedule, [field]: value } : schedule
    )
    setSchedules(newSchedule)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (schedules.some(schedule => schedule.day === '' || schedule.startTime === '' || schedule.duration === '')) {
      toast({
        title: 'Not all fields are filled in',
        description: 'Please fill in all fields of the schedule',
        duration: 2000
      })
      return
    }

    const scheduleData = schedules.map(schedule => (
      {
        day: schedule.day === '' ? undefined : schedule.day,
        startTime: schedule.startTime === '' ? undefined : schedule.startTime,
        duration: schedule.duration === '' ? undefined : Number(schedule.duration),
        endTime: schedule.duration === '' ? undefined : calculateEndTime(schedule.startTime, Number(schedule.duration))
      }
    ))

    const updatedData = {
      id: courseInstanceId,
      classroom: classroom === '' ? undefined : classroom,
      teacher: teacher === '' ? undefined : teacher,
      schedule: scheduleData
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

          {schedules.map((schedule, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <Separator />
              <Label className='font-bold'>Schedule {index + 1}</Label>
              <SimpleSelectField
                name='day'
                label='Day'
                value={schedule.day}
                options={dayOptions}
                placeholder='Select a day'
                textTransform='capitalize'
                onChange={(value: string) => {
                  handleScheduleChange(index, 'day', value)
                }}
              />
              <SimpleSelectField
                name='startTime'
                label='Start time'
                options={startTimes}
                value={schedule.startTime}
                placeholder='Select a start time'
                onChange={(value: string) => {
                  handleScheduleChange(index, 'startTime', value)
                }}
              />
              <SimpleSelectField
                name='duration'
                label='Duration'
                textTransform='block'
                value={schedule.duration}
                options={durationnOptions}
                placeholder='Select a duration'
                onChange={(value: string) => {
                  handleScheduleChange(index, 'duration', value)
                }}
              />

              <Button variant={'destructive'} onClick={() => { handleRemoveSchedule(index) }}>
                Remove schedule
              </Button>
            </div>
          ))}

          <Button className='bg-text-200' type='button' onClick={handleAddSchedule}>
            Add schedule
          </Button>
          <Separator className='mt-2' />
          <SubmitButton isLoading={false} text='Update' />
        </form>
      </CardContent>
    </Card>
  )
}

export default CourseInstanceUpdateForm

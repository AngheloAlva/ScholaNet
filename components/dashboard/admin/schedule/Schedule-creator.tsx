/* eslint-disable @typescript-eslint/no-misused-promises */

import { dayOptions, initialSchedule, startTimes } from '../../../../data/consts'
import useCourseInstanceData from '@/hooks/useCourseInstanceData'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { calculateEndTime } from '@/helpers/calculateEndTime'
import { createSchedule } from '@/api/course/schedule'
import { move, reorder } from '@/utils/dragAndDrop'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import CourseDraggable from './Course-draggable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DayColumn from './Day-column'

import type { ScheduleDnD, Day, Time } from '@/types/course/schedule'
import type { DropResult } from 'react-beautiful-dnd'

function ScheduleCreator (): React.ReactElement {
  const [schedule, setSchedule] = useState<ScheduleDnD>(initialSchedule)
  const [scheduleName, setScheduleName] = useState<string>('')
  const { courseInstances, setCourseInstances } = useCourseInstanceData()
  const { toast } = useToast()
  const router = useRouter()

  const handleOnDragEnd = (result: DropResult): void => {
    if (result.destination == null) return

    const { source, destination } = result

    const newSchedule = { ...schedule }
    let newCourseInstances = [...courseInstances]

    const [sourceDay, sourceTime] = source.droppableId.split('-')
    const [destDay, destTime] = destination.droppableId.split('-')

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        newSchedule[sourceDay as Day][sourceTime as Time],
        source.index,
        destination.index
      )
      newSchedule[sourceDay as Day][sourceTime as Time] = items
    } else {
      const result = move(
        sourceDay === 'courses' ? newCourseInstances : newSchedule[sourceDay as Day][sourceTime as Time],
        destDay === 'courses' ? newCourseInstances : newSchedule[destDay as Day][destTime as Time],
        source,
        destination
      )

      if (sourceDay === 'courses') {
        newCourseInstances = result[source.droppableId]
      } else {
        newSchedule[sourceDay as Day][sourceTime as Time] = result[source.droppableId]
      }

      if (destDay === 'courses') {
        newCourseInstances = result[destination.droppableId]
      } else {
        newSchedule[destDay as Day][destTime as Time] = result[destination.droppableId]
      }
    }

    setSchedule(newSchedule)
    setCourseInstances(newCourseInstances)
  }

  const handleScheduleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setScheduleName(value)
  }

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const scheduleToSubmit = {
      name: scheduleName,
      days: Object.entries(schedule).map(([day, blocks]) => ({
        day,
        blocks: Object.entries(blocks).flatMap(([startTime, courseInstances]) =>
          courseInstances.map(courseInstance => ({
            startTime,
            endTime: calculateEndTime(startTime, 2),
            courseInstance: courseInstance._id,
            assignedStudents: courseInstance.students.map(student => student._id)
          }))
        )
      }))
    }

    try {
      await createSchedule({ name: scheduleToSubmit.name, days: scheduleToSubmit.days })
      toast({
        title: 'Schedule created',
        duration: 3000,
        description: 'Schedule created successfully'
      })
      router.push('/dashboard/admin/schedules')
    } catch (error) {
      toast({
        title: 'Error',
        duration: 4000,
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.'
      })
    }
  }

  return (
    <form className='flex flex-col gap-5' onSubmit={async (e) => { await handleScheduleSubmit(e) }}>
      <h2 className='text-2xl font-bold'>Schedule creator</h2>
      <div>
        <Label>Schedule Name</Label>
        <Input required value={scheduleName} onChange={handleScheduleNameChange} placeholder='Primary "1A"' />
      </div>

      <div className='w-full flex flex-col gap-2'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='courses'>
            {(provided) => (
              <>
                <Label>Courses Instances</Label>
                <div className='flex gap-2 border-l-2 pl-4 flex-wrap min-h-[5rem]' ref={provided.innerRef} {...provided.droppableProps}>
                  {courseInstances.map((course, index) => (
                    <CourseDraggable course={course} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>

          <table className='mt-5'>
            <thead>
              <tr >
                {dayOptions.map((day, index) => (
                  <th className='rounded-md border-bg-300 border-2' key={index}>{day}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {startTimes.map((time, index) => (
                <tr key={time}>
                  {
                    dayOptions.map(day => (
                      <Droppable droppableId={`${day}-${time}`} key={`${day}-${time}`}>
                        {(provided) => (
                          <DayColumn day={day} time={time} schedule={schedule} provided={provided} />
                        )}
                      </Droppable>
                    ))
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </DragDropContext>
      </div>

      <Button type='submit'>
        Submit
      </Button>
    </form>
  )
}

export default ScheduleCreator

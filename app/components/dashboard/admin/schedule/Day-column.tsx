import { Draggable, type DroppableProvided } from 'react-beautiful-dnd'
import type { Day, ScheduleDnD, Time } from '@/types/course/schedule'

interface DayColumnProps {
  day: string
  time: string
  schedule: ScheduleDnD
  provided: DroppableProvided
}

function DayColumn ({
  day, time, schedule, provided
}: DayColumnProps): React.ReactElement {
  return (
    <td
      className='border-2 border-bg-300 min-w-[17rem] h-28 py-2 px-4'
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        (schedule[day as Day]?.[time as Time])
          ? schedule[day as Day][time as Time].map((course, index) => (
            <Draggable key={course._id} draggableId={course._id} index={index}>
              {(provided) => (
                <div
                  className='border-2 w-60 text-sm border-bg-300 bg-bg-100 text-text-100 px-5 py-2 rounded-md flex flex-col items-start'
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <span className='font-semibold'>Course: {course.course.title}</span>
                  <span className='font-semibold'>{course.classroom}</span>
                  <span className='font-semibold'>Teacher: {course.teacher.name + ' ' + course.teacher.lastName}</span>
                </div>
              )}
            </Draggable>
          ))
          : null
      }
      {provided.placeholder}
    </td>
  )
}

export default DayColumn

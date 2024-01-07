import { Draggable } from 'react-beautiful-dnd'
import type { CourseInstance } from '@/types/course/course-instance'

interface CourseDraggableProps {
  course: CourseInstance
  index: number
}

function CourseDraggable ({
  course, index
}: CourseDraggableProps): React.ReactElement {
  return (
    <Draggable key={course._id} draggableId={course._id} index={index}>
      {(provided) => (
        <div
          className='border-2 text-sm font-semibold w-60 border-bg-300 bg-bg-100 text-text-100 px-5 py-2 rounded-md flex flex-col items-start'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>Course: {course.course.title}</span>
          <span>{course.classroom}</span>
          <span>Teacher: {course.teacher.name + ' ' + course.teacher.lastName}</span>
        </div>
      )}
    </Draggable>
  )
}

export default CourseDraggable

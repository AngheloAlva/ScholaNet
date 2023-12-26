import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import type { CourseInstance } from '@/types/course/course-instance'

function CourseInstanceData ({
  data
}: { data: CourseInstance }): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Instance Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Course: </strong> {data.course.title}</p>
        <p><strong>Teacher: </strong> {data.teacher.name}</p>
        <p><strong>Semester: </strong> {data.semester.name}</p>
        <p><strong>Year: </strong> {data.academicYear}</p>
        <p><strong>Classroom: </strong> {data.classroom}</p>
        <p><strong>Schedule: </strong></p>
        {
          data.schedule.map((schedule) => (
            <div key={schedule._id}>
              <p>Day: {schedule.day}</p>
              <p>Start time: {schedule.startTime}</p>
              <p>End time: {schedule.endTime}</p>
              <p>Duration: {schedule.duration}</p>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

export default CourseInstanceData

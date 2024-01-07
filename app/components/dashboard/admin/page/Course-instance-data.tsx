import useCourseInstanceById from '@/app/hooks/useCourseInstanceById'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'

function CourseInstanceData ({
  courseInstanceId
}: { courseInstanceId: string }): React.ReactElement {
  const { courseInstance } = useCourseInstanceById(courseInstanceId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Instance Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Course: </strong> {courseInstance?.course.title}</p>
        <p><strong>Teacher: </strong> {courseInstance?.teacher.name}</p>
        <p><strong>Semester: </strong> {courseInstance?.semester.name}</p>
        <p><strong>Year: </strong> {courseInstance?.academicYear}</p>
        <p><strong>Classroom: </strong> {courseInstance?.classroom}</p>
        <p><strong>Schedule: </strong></p>
      </CardContent>
    </Card>
  )
}

export default CourseInstanceData

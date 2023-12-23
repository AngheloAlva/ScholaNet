import useCourseData from '@/hooks/useCourseData'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function CourseSelect (
  { value, onChange }: { value: string, onChange: (value: string) => void }
): React.ReactElement {
  const { courses } = useCourseData()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Course" />
      </SelectTrigger>
      <SelectContent>
        {
          courses.map(course => (
            <SelectItem key={course._id} value={course._id}>
              {course.title}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}

export default CourseSelect

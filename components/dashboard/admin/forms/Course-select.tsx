import useCourseData from '@/hooks/useCourseData'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

function CourseSelect (
  { value, onChange, label }: { value: string, label: string, onChange: (value: string) => void }
): React.ReactElement {
  const { courses } = useCourseData()

  return (
    <div className='flex flex-col gap-2 mt-1'>
      <Label>{label}</Label>
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
    </div>
  )
}

export default CourseSelect

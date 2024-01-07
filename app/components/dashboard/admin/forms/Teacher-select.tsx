import useTeacherData from '@/app/hooks/useTeacherData'

import { Label } from '@/app/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

interface TeacherSelectProps {
  value: string
  onChange: (value: string) => void
  label: string
}

function TeacherSelect ({
  value, onChange, label
}: TeacherSelectProps): React.ReactElement {
  const { teachers } = useTeacherData()

  return (
    <div className='flex flex-col gap-2 mt-1'>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Asign a Teacher" />
        </SelectTrigger>
        <SelectContent>
          {
            teachers.map(teacher => (
              <SelectItem key={teacher._id} value={teacher._id}>
                {teacher.name} {teacher.lastName}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default TeacherSelect

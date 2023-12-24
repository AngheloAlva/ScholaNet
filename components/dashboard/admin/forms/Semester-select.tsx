import useSemesterData from '@/hooks/useSemesterData'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

function SemesterSelect (
  { value, onChange, label }: { value: string, label: string, onChange: (value: string) => void }
): React.ReactElement {
  const { semesters } = useSemesterData()

  return (
    <div className='flex flex-col gap-2 mt-1'>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Semester" />
        </SelectTrigger>
        <SelectContent>
          {
            semesters.map(semester => (
              <SelectItem key={semester._id} value={semester._id}>
                {semester.name}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default SemesterSelect

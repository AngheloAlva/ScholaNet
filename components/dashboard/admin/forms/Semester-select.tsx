import useSemesterData from '@/hooks/useSemesterData'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function SemesterSelect (
  { value, onChange }: { value: string, onChange: (value: string) => void }
): React.ReactElement {
  const { semesters } = useSemesterData()

  return (
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
  )
}

export default SemesterSelect

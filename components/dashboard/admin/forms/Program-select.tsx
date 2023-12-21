import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useProgramData from '@/hooks/useProgramData'

function ProgramSelect (
  { value, onChange }: { value: string, onChange: (value: string) => void }
): React.ReactElement {
  const { programs } = useProgramData()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Program" />
      </SelectTrigger>
      <SelectContent>
        {
          programs.map(program => (
            <SelectItem key={program._id} value={program._id}>
              {program.name}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}

export default ProgramSelect

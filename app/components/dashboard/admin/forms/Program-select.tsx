import useProgramData from '@/app/hooks/useProgramData'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

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

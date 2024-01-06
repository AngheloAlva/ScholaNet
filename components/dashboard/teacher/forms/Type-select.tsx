import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

function TypeSelect (
  { onChange, value }: { value: string, onChange: (value: string) => void }
): React.ReactElement {
  return (
    <>
      <Label>Material type</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='video'>Video</SelectItem>
            <SelectItem value='link'>Link</SelectItem>
            <SelectItem value='pdf'>PDF</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default TypeSelect

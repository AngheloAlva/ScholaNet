import { Label } from '@/app/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

interface SimpleSelectFieldProps {
  options: string[]
  label: string
  name: string
  placeholder: string
  value: string
  textTransform?: 'capitalize' | 'block'
  onChange: (value: string) => void
}

function SimpleSelectField ({
  label, name, onChange, options, value, placeholder, textTransform
}: SimpleSelectFieldProps): React.ReactElement {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue id={name} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {
                textTransform === 'capitalize'
                  ? option.charAt(0).toUpperCase() + option.slice(1)
                  : textTransform === 'block'
                    ? `${option} block${option === '1' ? '' : 's'}`
                    : option
              }
            </SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SimpleSelectField

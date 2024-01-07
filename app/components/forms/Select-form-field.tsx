import { Controller } from 'react-hook-form'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { FormControl } from '@/app/components/ui/form'

interface SelectFieldProps {
  form: any
  name: string
  index?: string
  options: string[]
  placeholder: string
  textTransform?: 'capitalize' | 'block'
}

function SelectField ({
  form, index, options, textTransform, placeholder, name
}: SelectFieldProps): React.ReactElement {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
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
          </SelectContent>
        </Select>
      )}
    />
  )
}

export default SelectField

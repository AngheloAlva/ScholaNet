import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

import type { Control } from 'react-hook-form'

export interface AuthFormFieldProps {
  control?: Control<any>
  name: string
  label: string
  type?: string
  placeholder: string
}

function AuthFormField ({
  control, name, label, type = 'text', placeholder
}: AuthFormFieldProps): React.ReactElement {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-text-100'>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AuthFormField

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { formatRut } from '@/app/lib/formatRut'

interface RutFormFieldProps {
  control: Control<any>
  name: string
  label: string
}

function RutFormField ({
  label, control, name
}: RutFormFieldProps): React.ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <Label>{label}</Label>
          <Input
            value={field.value}
            onChange={(e) => {
              field.onChange(formatRut(e.target.value))
            }}
            placeholder='12.345.678-9'
          />
          {(fieldState.error != null) && (
            <p className='text-sm font-medium text-destructive'>
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}

export default RutFormField

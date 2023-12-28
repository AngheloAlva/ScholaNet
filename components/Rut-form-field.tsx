import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Input } from './ui/input'
import { Label } from './ui/label'

interface RutFormFieldProps {
  control: Control<any>
  name: string
  label: string
}

function RutFormField ({
  label, control, name
}: RutFormFieldProps): React.ReactElement {
  const formatRut = (value: string): string => {
    if (value.length === 0) return ''

    let cleanValue = value.replace(/[^0-9kK]+/g, '')

    cleanValue = cleanValue.slice(0, 9)

    if (cleanValue.length > 1) {
      cleanValue = `${cleanValue.slice(0, -1)}-${cleanValue.slice(-1)}`
    }

    const parts = cleanValue.split('-')
    let numberPart = parts[0]
    numberPart = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    if (parts.length === 1) return numberPart
    return `${numberPart}-${parts[1]}`
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <Label>{label}</Label>
          <Input
            value={field.value}
            onChange={(e) => { field.onChange(formatRut(e.target.value)) }}
            placeholder='12.345.678-9'
          />
        </div>
      )}
    />
  )
}

export default RutFormField

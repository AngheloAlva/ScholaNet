import { Input } from '@/app/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

function NumberPasswordField (
  { form, type = 'text' }: { form: any, type?: string }
): React.ReactElement {
  return (
    <FormField
      control={form.control}
      name={'password'}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-text-100'>Password</FormLabel>
          <FormControl>
            <Input
              placeholder='1234'
              type={type}
              maxLength={4}
              {...field}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '')
                field.onChange(value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default NumberPasswordField

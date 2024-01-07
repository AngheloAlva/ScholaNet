import { type Control, Controller } from 'react-hook-form'

import { Label } from '@/app/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/components/ui/select'

interface TypeSelectFieldProps {
  control: Control<{
    questions: Array<{
      questionText: string
      options: string[]
      correctAnswer: string
      points: number
      questionType: string
    }>
  }>
  index: number
}

function TypeSelectField (
  { control, index }: TypeSelectFieldProps
): React.ReactElement {
  return (
    <div>
      <Label>Question type</Label>
      <Controller
        control={control}
        name={`questions.${index}.questionType`}
        render={({ field }) => (
          <Select {...field} onValueChange={(value) => { field.onChange(value) }}>
            <SelectTrigger>
              <SelectValue placeholder='Question type' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='multipleChoice'>Multiple choice</SelectItem>
                <SelectItem value='trueFalse'>True or false</SelectItem>
                <SelectItem value='shortAnswer'>Short answer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}

export default TypeSelectField

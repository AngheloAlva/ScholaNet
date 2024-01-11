import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

import type { Question } from '@/types/course/question'

interface MultipleChoiceOptionProps {
  index: number
  option: string
  question: Question
  handleAnswerChange: (questionId: string, answer: string) => void
}

function MultipleChoiceOption ({
  question, option, handleAnswerChange, index
}: MultipleChoiceOptionProps): React.ReactElement {
  return (
    <div key={index} className='flex items-center gap-2'>
      <Input
        type='radio'
        className='w-auto'
        name={question._id}
        value={option}
        id={`${question._id}-${option}`}
        onChange={(e) => {
          handleAnswerChange(question._id, e.target.value)
        }}
      />
      <Label htmlFor={`${question._id}-${option}`}>{option}</Label>
    </div>
  )
}

export default MultipleChoiceOption

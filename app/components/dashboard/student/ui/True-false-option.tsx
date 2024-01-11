import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

interface TrueFalseOptionProps {
  questionId: string
  handleAnswerChange: (questionId: string, answer: string) => void
}

function TrueFalseOption ({
  questionId, handleAnswerChange
}: TrueFalseOptionProps): React.ReactElement {
  return (
    <div className='flex gap-6'>
      <div className='flex items-center gap-2'>
        <Input
          type='radio'
          name={questionId}
          id={`${questionId}-true`}
          className='w-auto'
          onChange={(e) => {
            handleAnswerChange(questionId, e.target.value)
          }}
        />
        <Label htmlFor={`${questionId}-true`}>True</Label>
      </div>

      <div className='flex items-center'>
        <Input
          type='radio'
          name={questionId}
          id={`${questionId}-false`}
          className='w-auto'
          onChange={(e) => {
            handleAnswerChange(questionId, e.target.value)
          }}
        />
        <Label className='pl-2' htmlFor={`${questionId}-false`}>False</Label>
      </div>
    </div>
  )
}

export default TrueFalseOption

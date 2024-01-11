import { Textarea } from '@/app/components/ui/textarea'

interface ShortAnswerOptionProps {
  questionId: string
  handleAnswerChange: (questionId: string, answer: string) => void
}

function ShortAnswerOption ({
  questionId, handleAnswerChange
}: ShortAnswerOptionProps): React.ReactElement {
  return (
    <div>
      <Textarea
        name={questionId}
        id={questionId}
        placeholder='Short Answer'
        onChange={(e) => {
          handleAnswerChange(questionId, e.target.value)
        }}
      />
    </div>
  )
}

export default ShortAnswerOption

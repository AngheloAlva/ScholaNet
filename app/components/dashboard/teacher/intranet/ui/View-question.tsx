/* eslint-disable @typescript-eslint/no-misused-promises */
import { deleteQuestion } from '@/api/course/question'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { useToast } from '@/app/components/ui/use-toast'
import type { Question } from '@/types/course/question'

interface ViewQuestionProps {
  questions: Question[]
  evaluationId: string
  reloadData: () => Promise<void>
}

function ViewQuestion ({
  questions, evaluationId, reloadData
}: ViewQuestionProps): React.ReactElement {
  const { toast } = useToast()

  const handleDeleteQuestion = async (questionId: string): Promise<void> => {
    try {
      await deleteQuestion(questionId)
      toast({
        title: 'Question deleted successfully',
        description: 'The question was deleted successfully',
        duration: 2000
      })
      await reloadData()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error has occurred, please try again',
        duration: 2000
      })
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {questions.map((question) => (
        <Card>
          <CardHeader key={question._id}>
            <CardTitle className='underline'>{question.questionText}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Type: {question.questionType}</p>
            <p>Correct Answer: {question.correctAnswer}</p>
            <p>Points: {question.points}</p>
            <p>Options: </p>
            {
              question.options.map((option) => (
                <p key={option} className='ml-4'>-{option}</p>
              ))
            }
          </CardContent>
          <CardFooter>
            <Button
              className='w-full'
              onClick={async () => {
                await handleDeleteQuestion(question._id)
              }}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>

      ))}
    </div>
  )
}

export default ViewQuestion

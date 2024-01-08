/* eslint-disable @typescript-eslint/no-misused-promises */
import { deleteQuestion } from '@/api/course/question'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card'
import { useToast } from '@/app/components/ui/use-toast'
import type { Question } from '@/types/course/question'

interface ViewQuestionProps {
  questions: Question[]
  evaluationId: string
  reloadQuestions: () => Promise<void>
}

function ViewQuestion ({
  questions, evaluationId, reloadQuestions
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
      await reloadQuestions()
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: (error as any).response.data.message ?? 'An error has occurred, please try again',
        duration: 3000
      })
    }
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {questions.map((question) => (
        <Card key={question._id}>
          <CardHeader>
            <CardTitle className='underline'>{question.questionText}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Type: </strong>{question.questionType}</p>
            <p><strong>Correct Answer: </strong>{question.correctAnswer}</p>
            <p><strong>Points: </strong>{question.points}</p>
            <p><strong>Options: </strong></p>
            {
              question.options.map((option) => (
                <p key={option} className='ml-4'>-{option}</p>
              ))
            }
          </CardContent>
          <CardFooter>
            <Button
              variant={'destructive'}
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

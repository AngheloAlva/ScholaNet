import MultipleChoiceOption from '@/app/components/dashboard/student/ui/Multiple-choice-option'
import ShortAnswerOption from '@/app/components/dashboard/student/ui/Short-answer-option'
import TrueFalseOption from '@/app/components/dashboard/student/ui/True-false-option'

import type { Question } from '@/types/course/question'

interface QuestionsSectionProps {
  questions: Question[]
  handleAnswerChange: (questionId: string, answer: string) => void
}

function QuestionsSection ({
  questions, handleAnswerChange
}: QuestionsSectionProps): React.ReactElement {
  return (
    <div className='flex flex-col gap-6'>
      {
        questions.map((question, index) => (
          <div key={question._id}>
            <h3>
              <strong>Question {index + 1}:</strong> {question.questionText}
            </h3>

            {question.questionType === 'multipleChoice' && (
                <div>
                  {
                    question.options.map((option, index) => (
                      <MultipleChoiceOption
                        key={index}
                        index={index}
                        option={option}
                        question={question}
                        handleAnswerChange={handleAnswerChange}
                      />
                    ))
                  }
                </div>
            )}

            {question.questionType === 'trueFalse' && (
              <TrueFalseOption
                handleAnswerChange={handleAnswerChange}
                questionId={question._id}
              />
            )}

            {question.questionType === 'shortAnswer' && (
              <ShortAnswerOption
                handleAnswerChange={handleAnswerChange}
                questionId={question._id}
              />
            )}
          </div>
        ))
      }
    </div>
  )
}

export default QuestionsSection

import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

import type { Evaluation } from '@/types/course/evaluation'

interface Props {
  evaluation: Evaluation
  today: Date
  teacherId: string
  courseInstanceId: string
  handleDeleteEvaluation: (evaluationId: string) => Promise<void>
}

function EvaluationItem ({
  evaluation, today, courseInstanceId, teacherId, handleDeleteEvaluation
}: Props): React.ReactElement {
  const calculateDaysLeft = (dueDate: string): number => {
    const dueDateInMs = new Date(dueDate).getTime()
    const todayInMs = new Date().getTime()

    return Math.floor((dueDateInMs - todayInMs) / (1000 * 60 * 60 * 24))
  }

  return (
    <li key={evaluation._id} className='flex justify-between w-full sm:flex-col h-full text-text-100'>
      <div className='w-full flex sm:gap-2 flex-col sm:flex-row justify-between'>
        <div className='w-auto'>
        <h3 className='font-bold flex items-center gap-2'>
          {evaluation.title}
          <Link href={`/dashboard/teacher/${teacherId}/intranet/${courseInstanceId}/evaluation/${evaluation._id}`}>
            <Button className='px-4 transition-colors h-6' variant={'secondary'}>
              Edit
            </Button>
          </Link>
          <Button
            variant={'destructive'}
            className='px-2 transition-colors h-6'
            onClick={() => {
              void handleDeleteEvaluation(evaluation._id)
            }}
          >
            Delete
          </Button>
        </h3>

        <p>{evaluation.description}</p>
        </div>
        {
          today > new Date(evaluation.dueDate)
            ? <p className='text-red-500 sm:text-right'>Due date passed</p>
            : <p className='text-primary-100 sm:text-right'>{calculateDaysLeft(evaluation.dueDate)} days left</p>
        }
      </div>
    </li>
  )
}

export default EvaluationItem

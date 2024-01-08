import { Button } from '@/app/components/ui/button'
import type { Evaluation } from '@/types/course/evaluation'
import Link from 'next/link'

interface Props {
  evaluation: Evaluation
  today: Date
  teacherId: string
  courseInstanceId: string
}

function EvaluationItem ({
  evaluation, today, courseInstanceId, teacherId
}: Props): React.ReactElement {
  const calculateDaysLeft = (dueDate: string): number => {
    const dueDateInMs = new Date(dueDate).getTime()
    const todayInMs = new Date().getTime()

    return Math.floor((dueDateInMs - todayInMs) / (1000 * 60 * 60 * 24))
  }

  return (
    <Link href={`/dashboard/teacher/${teacherId}/intranet/${courseInstanceId}/evaluation/${evaluation._id}`} className='w-full'>
      <li key={evaluation._id} className='flex justify-between w-full h-full text-text-100'>
        <div className='w-full flex sm:gap-2 flex-col sm:flex-row justify-between'>
          <div className='w-auto'>
            <h3 className='font-bold'>{evaluation.title}</h3>
            <p>{evaluation.description}</p>
          </div>
          {
            today > new Date(evaluation.dueDate)
              ? <p className='text-red-500 sm:text-right'>Due date passed</p>
              : <p className='text-primary-100 sm:text-right'>{calculateDaysLeft(evaluation.dueDate)} days left</p>
          }
        </div>
        <Button variant={'link'}>
          {/* <a href={evaluation.url} target='_blank'>
            {evaluation.type === 'pdf' ? 'View' : 'Go'} {evaluation.type}
          </a> */}
        </Button>
      </li>
    </Link>
  )
}

export default EvaluationItem

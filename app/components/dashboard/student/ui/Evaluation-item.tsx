import { calculateDaysLeft } from '@/app/lib/calculateDaysLeft'
import Link from 'next/link'

import { HiCursorClick } from 'react-icons/hi'

import type { Evaluation } from '@/types/course/evaluation'

interface Props {
  evaluation: Evaluation
  studentId: string
  today: Date
}

function EvaluationItem ({
  evaluation, today, studentId
}: Props): React.ReactElement {
  return (
    <li key={evaluation._id} className='flex justify-between w-full sm:flex-col h-full text-text-100'>
      <Link href={`/dashboard/student/${studentId}/intranet/${evaluation.courseInstance._id}/evaluation/${evaluation._id}`}>
        <div className='w-full flex sm:gap-2 flex-col sm:flex-row justify-between'>
          <div className='w-auto'>
          <h3 className='font-bold flex items-center gap-4 hover:underline'>
            {evaluation.title}
            <HiCursorClick className='text-accent-100' />
          </h3>

          <p>{evaluation.description}</p>
          </div>
          {
            today > new Date(evaluation.dueDate)
              ? <p className='text-red-500 sm:text-right'>Due date passed</p>
              : <p className='text-primary-100 sm:text-right'>{calculateDaysLeft(evaluation.dueDate)} days left</p>
          }
        </div>
      </Link>
    </li>
  )
}

export default EvaluationItem

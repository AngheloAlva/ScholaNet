import Link from 'next/link'

import { Button } from '@/app/components/ui/button'
import EvaluationItem from '../ui/Evaluation-item'

import type { Evaluation } from '@/types/course/evaluation'

interface Props {
  evaluations: Evaluation[]
  teacherId: string
  courseId: string
}

function EvaluationSection ({
  teacherId, courseId, evaluations
}: Props): React.ReactElement {
  const today = new Date()

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Evaluations</h2>
        <Link href={`/dashboard/teacher/${teacherId}/intranet/${courseId}/create-evaluation`}>
          <Button variant={'outline'}>
            Create evaluation
          </Button>
        </Link>
      </div>
      <ul className='flex pl-2 mt-4 flex-col items-start justify-center w-full h-full gap-2'>
        {
          evaluations.length === 0
            ? <p>No evaluations</p>
            : evaluations?.map((evaluation) => (
                <EvaluationItem evaluation={evaluation} today={today} teacherId={teacherId} courseInstanceId={courseId} />
            ))
        }
      </ul>
    </div>
  )
}

export default EvaluationSection

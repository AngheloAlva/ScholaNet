import Link from 'next/link'

import { Button } from '@/components/ui/button'
import EvaluationItem from './Evaluation-item'

import type { Evaluation } from '@/types/course/evaluation'

interface Props {
  evaluations: Evaluation[]
  teacherId: string
  courseId: string
}

function EvaluationSection ({
  teacherId, courseId, evaluations
}: Props): React.ReactElement {
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
      <ul className='flex flex-col items-start justify-center w-full h-full gap-2'>
        {
          evaluations.length === 0
            ? <p>No evaluations</p>
            : evaluations?.map((evaluation) => (
                <EvaluationItem evaluation={evaluation} />
            ))
        }
      </ul>
    </div>
  )
}

export default EvaluationSection

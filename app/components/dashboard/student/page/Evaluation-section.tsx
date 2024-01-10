import type { Evaluation } from '@/types/course/evaluation'
import EvaluationItem from '../ui/Evaluation-item'

interface Props {
  evaluations: Evaluation[]
  studentId: string
}

function EvaluationSection ({
  evaluations, studentId
}: Props): React.ReactElement {
  const today = new Date()

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Evaluations</h2>
      </div>
      <ul className='flex pl-2 mt-4 flex-col items-start justify-center w-full h-full gap-4'>
        {
          evaluations.length === 0
            ? <p>No evaluations</p>
            : evaluations?.map((evaluation) => (
                <EvaluationItem
                  evaluation={evaluation}
                  studentId={studentId}
                  key={evaluation._id}
                  today={today}
                />
            ))
        }
      </ul>
    </div>
  )
}

export default EvaluationSection

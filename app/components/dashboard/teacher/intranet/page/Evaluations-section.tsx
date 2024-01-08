import { deleteEvaluation } from '@/api/course/evaluation'
import Link from 'next/link'

import { useToast } from '@/app/components/ui/use-toast'
import { Button } from '@/app/components/ui/button'
import EvaluationItem from '../ui/Evaluation-item'

import type { Evaluation } from '@/types/course/evaluation'

interface Props {
  evaluations: Evaluation[]
  teacherId: string
  courseId: string
  reloadEvaluations: () => Promise<void>
}

function EvaluationSection ({
  teacherId, courseId, evaluations, reloadEvaluations
}: Props): React.ReactElement {
  const today = new Date()
  const { toast } = useToast()

  const handleDeleteEvaluation = async (evaluationId: string): Promise<void> => {
    try {
      await deleteEvaluation(evaluationId)
      void reloadEvaluations()
      toast({
        title: 'Evaluation deleted',
        description: 'The evaluation was deleted successfully',
        duration: 2500
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred',
        duration: 2500
      })
    }
  }

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
      <ul className='flex pl-2 mt-4 flex-col items-start justify-center w-full h-full gap-4'>
        {
          evaluations.length === 0
            ? <p>No evaluations</p>
            : evaluations?.map((evaluation) => (
                <EvaluationItem
                  handleDeleteEvaluation={handleDeleteEvaluation}
                  evaluation={evaluation}
                  today={today}
                  teacherId={teacherId}
                  courseInstanceId={courseId}
                />
            ))
        }
      </ul>
    </div>
  )
}

export default EvaluationSection

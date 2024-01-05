import type { Evaluation } from '@/types/course/evaluation'

function EvaluationItem (
  { evaluation }: { evaluation: Evaluation }
): React.ReactElement {
  return (
    <li key={evaluation._id} className='flex flex-col items-start justify-center w-full h-full gap-2'>
      <h3 className='text-xl font-bold'>{evaluation.title}</h3>
      <p>{evaluation.description}</p>
    </li>
  )
}

export default EvaluationItem

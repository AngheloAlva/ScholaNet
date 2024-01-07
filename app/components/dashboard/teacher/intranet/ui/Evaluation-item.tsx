import { Button } from '@/app/components/ui/button'
import type { Evaluation } from '@/types/course/evaluation'

function EvaluationItem (
  { evaluation }: { evaluation: Evaluation }
): React.ReactElement {
  return (
    <li key={evaluation._id} className='flex justify-between w-full h-full text-text-100'>
      <div>
        <h3 className='font-bold'>{evaluation.title}</h3>
        <p>{evaluation.description}</p>
      </div>
      <Button variant={'link'}>
        {/* <a href={evaluation.url} target='_blank'>
          {evaluation.type === 'pdf' ? 'View' : 'Go'} {evaluation.type}
        </a> */}
      </Button>
    </li>
  )
}

export default EvaluationItem

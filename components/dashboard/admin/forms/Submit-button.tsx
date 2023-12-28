import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function SubmitButton (
  { isLoading, text, className }: { isLoading: boolean, text: string, className?: string }
): React.ReactElement {
  return (
    <Button
      type='submit'
      disabled={isLoading}
      className={cn('w-full mt-2', className)}
    >
      { isLoading
        ? <div className='lds-ring'><div /><div /><div /><div /></div>
        : text
      }
    </Button>
  )
}

export default SubmitButton

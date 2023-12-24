import { Button } from '@/components/ui/button'

function SubmitButton (
  { isLoading, text }: { isLoading: boolean, text: string }
): React.ReactElement {
  return (
    <Button
      type='submit'
      disabled={isLoading}
      className='w-full mt-2'
    >
      { isLoading
        ? <div className='lds-ring'><div /><div /><div /><div /></div>
        : text
      }
    </Button>
  )
}

export default SubmitButton

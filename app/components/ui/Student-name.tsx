import { Skeleton } from './skeleton'

interface StudentNameProps {
  name: string | undefined
  lastName: string | undefined
  isLoading: boolean
  text: string
}

function StudentName ({
  isLoading, name, lastName, text
}: StudentNameProps): React.ReactElement {
  return (
    <h1 className='flex items-center text-xl font-bold'>
      {text}
      {
        isLoading
          ? <Skeleton className='w-48 h-7 ml-2' />
          : ` - ${name} ${lastName}`
      }
    </h1>
  )
}

export default StudentName

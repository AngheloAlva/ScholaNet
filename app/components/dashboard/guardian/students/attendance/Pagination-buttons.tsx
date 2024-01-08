import type { Table } from '@tanstack/react-table'
import { Button } from '../../../../ui/button'

interface PaginationButtonsProps {
  table: Table<any>
}

function PaginationButtons ({
  table
}: PaginationButtonsProps): React.ReactElement {
  return (
    <div className='flex items-center justify-center space-x-2 py-4'>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() => { table.previousPage() }}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>

      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() => { table.nextPage() }}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  )
}

export default PaginationButtons

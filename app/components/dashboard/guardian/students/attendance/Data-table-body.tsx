import { flexRender, type ColumnDef, type Table } from '@tanstack/react-table'
import {
  TableCell,
  TableBody,
  TableRow
} from '@/app/components/ui/table'

interface DataTableBodyProps {
  table: Table<any>
  columns: Array<ColumnDef<any, any>>
}

function DataTableBody ({
  table, columns
}: DataTableBodyProps): React.ReactElement {
  return (
    <TableBody>
      {((table.getRowModel().rows?.length) !== 0)
        ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )
        : (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            No results found
          </TableCell>
        </TableRow>
          )
      }
    </TableBody>
  )
}

export default DataTableBody

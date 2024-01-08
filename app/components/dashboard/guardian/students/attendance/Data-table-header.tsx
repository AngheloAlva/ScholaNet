import { flexRender, type Table } from '@tanstack/react-table'
import {
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'

interface DataTableHeaderProps {
  table: Table<any>
}

function DataTableHeader ({
  table
}: DataTableHeaderProps): React.ReactElement {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                }
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader

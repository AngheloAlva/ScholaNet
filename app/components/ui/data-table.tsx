'use client'

import { useState } from 'react'

import { Button } from './button'
import { Input } from './input'
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
  filterColumn: string
}

function DataTable<TData, TValue> ({
  columns, data, filterColumn
}: DataTableProps<TData, TValue>): React.ReactElement {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  return (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder={`Filter by ${filterColumn}`}
        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
        onChange={(e) =>
          table.getColumn(filterColumn)?.setFilterValue(e.target.value)
        }
      />

      <div className='rounded-md border'>
        <Table>
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
        </Table>
      </div>

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
    </div>
  )
}

export default DataTable

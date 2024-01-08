'use client'

import { useState } from 'react'

import PaginationButtons from './Pagination-buttons'
import { Table } from '@/app/components/ui/table'
import DataTableHeader from './Data-table-header'
import DataTableBody from './Data-table-body'
import { Input } from '../../../../ui/input'
import {
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'

import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table'

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
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} />
        </Table>
      </div>

      <PaginationButtons table={table} />
    </div>
  )
}

export default DataTable

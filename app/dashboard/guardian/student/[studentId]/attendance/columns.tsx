'use client'

import type { Attendance } from '@/types/course/attendance'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: Array<ColumnDef<Attendance>> = [
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'courseInstance',
    header: 'Course Instance'
  }
]

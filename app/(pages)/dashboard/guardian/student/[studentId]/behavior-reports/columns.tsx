'use client'

import type { BehaviorReport } from '@/types/student/behavior-report'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: Array<ColumnDef<BehaviorReport>> = [
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'resolved',
    header: 'Resolved'
  },
  {
    accessorKey: 'severity',
    header: 'Severity'
  }
]

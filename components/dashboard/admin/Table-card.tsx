'use client'

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { CardTitle, CardHeader, Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface TableCardProps {
  title: string
  tableHeader: string[]
  tableBody: string[][]
  handleClick?: (id: string) => void
}

function TableCard ({
  title, tableHeader, tableBody, handleClick
}: TableCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center px-4 justify-between space-y-0">
        <CardTitle className="text-base font-medium">
          { title }
        </CardTitle>
      </CardHeader>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            {
              tableHeader.map((header, index) => (
                <TableHead key={index}>
                  {header}
                </TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            tableBody.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  if (handleClick != null) {
                    handleClick(row[0])
                  }
                }}
                className='cursor-pointer hover:bg-bg-200'
              >
                {
                  row.map((cell, index) => (
                    <TableCell key={index} className='min-w-[15rem]'>
                      {cell}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Card>
  )
}

export default TableCard

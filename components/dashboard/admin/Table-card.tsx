import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table'
import { CardTitle, CardHeader, Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface TableCardProps {
  title: string
  tableHeader: string[]
  tableBody: string[][]
}

function TableCard ({
  title, tableHeader, tableBody
}: TableCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
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
              <TableRow key={index}>
                {
                  row.map((cell, index) => (
                    <TableCell key={index}>
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

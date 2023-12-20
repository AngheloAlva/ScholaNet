import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'

interface DataCardProps {
  title: string
  value: number
  icon: React.ReactElement
}

function DataCard ({
  title, value, icon
}: DataCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          { title }
        </CardTitle>
        { icon }
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          { value }
        </div>
      </CardContent>
    </Card>
  )
}

export default DataCard

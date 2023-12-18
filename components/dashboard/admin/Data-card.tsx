import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'

interface DataCardProps {
  title: string
  value: number
  percentage: string
  icon: React.ReactElement
}

function DataCard ({
  title, value, percentage, icon
}: DataCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          { title }
        </CardTitle>
        {/* <FiUsers className="w-4 h-4 text-gray-500 dark:text-gray-400" /> */}
        { icon }
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          { value }
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          { percentage } from last year
        </p>
      </CardContent>
    </Card>
  )
}

export default DataCard

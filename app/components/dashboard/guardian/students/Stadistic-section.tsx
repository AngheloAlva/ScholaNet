import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import BarChart from '../../../ui/BarChart'

function StadisticSection (): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Performance Statistics</CardTitle>
      </CardHeader>
      <CardContent className='mb-4 p-0'>
        <BarChart className='w-full aspect-[4/3]' />
      </CardContent>
    </Card>
  )
}

export default StadisticSection

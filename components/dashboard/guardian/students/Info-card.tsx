import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
}

function InfoCard ({
  icon, title, description, children
}: InfoCardProps): React.ReactElement {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {children}
        </div>
        <p className='text-xs text-gray-500'>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default InfoCard

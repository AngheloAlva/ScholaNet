import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  description?: string
  children: React.ReactNode
  href: string
}

function InfoCard ({
  icon, title, description, children, href
}: InfoCardProps): React.ReactElement {
  return (
    <Card>
      <Link href={href}>
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
      </Link>
    </Card>
  )
}

export default InfoCard

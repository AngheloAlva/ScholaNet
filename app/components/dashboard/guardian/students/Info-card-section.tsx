import { FaCalendarDays, FaBookOpen, FaTriangleExclamation, FaPhone } from 'react-icons/fa6'
import InfoCard from '@/app/components/dashboard/guardian/students/Info-card'
import { Skeleton } from '@/app/components/ui/skeleton'

interface InfoCardSectionProps {
  averageGrades: Record<string, number>
  attendance: number
  behaviorReports: number
  isLoading: boolean
  studentId: string
}

function InfoCardSection ({
  averageGrades, attendance, behaviorReports, isLoading, studentId
}: InfoCardSectionProps): React.ReactElement {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <InfoCard
        icon={<FaCalendarDays className='w-4 h-4 text-gray-500' />}
        description='of 180 days'
        title='Attendance'
        href={`/dashboard/guardian/student/${studentId}/attendance`}
      >
        {isLoading
          ? <Skeleton className='w-16 h-8' />
          : `${attendance.toFixed(2)} %`
        }
      </InfoCard>
      <InfoCard
        icon={<FaBookOpen className='w-4 h-4 text-gray-500' />}
        description='of 180 days'
        title='Academic Performance'
        href={`/dashboard/guardian/student/${studentId}/academic-performance`}
      >
        {isLoading
          ? <Skeleton className='w-16 h-8' />
          : averageGrades?.length > 0
            ? Object.entries(averageGrades).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
            ))
            : 'N/A'
        }
      </InfoCard>
      <InfoCard
        icon={<FaTriangleExclamation className='w-4 h-4 text-gray-500' />}
        description='Incidents this year'
        title='Behavior Reports'
        href={`/dashboard/guardian/student/${studentId}/behavior-reports`}
      >
        {isLoading
          ? <Skeleton className='w-16 h-8' />
          : behaviorReports
        }
      </InfoCard>
      <InfoCard
        icon={<FaPhone className='w-4 h-4 text-gray-500' />}
        description='New announcements this week'
        title='School Announcements'
        href={`/dashboard/guardian/student/${studentId}/announcements`}
      >
        {
          isLoading
            ? <Skeleton className='w-16 h-8' />
            : '3'
        }
      </InfoCard>
    </div>
  )
}

export default InfoCardSection

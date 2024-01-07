'use client'

import useStudentById from '@/app/hooks/useStudentById'
import { format } from 'date-fns'

import StadisticSection from '@/app/components/dashboard/guardian/students/Stadistic-section'
import InfoCardSection from '@/app/components/dashboard/guardian/students/Info-card-section'
import { Skeleton } from '@/app/components/ui/skeleton'
import TableCard from '@/app/components/ui/Table-card'

function ViewGuardianStudentPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { student, averageGrades, attendance, behaviorReports, isLoading } = useStudentById(params.studentId)
  const tableHeader: string[] = ['_id', 'Date', 'Description', 'Severity', 'Resolved?']
  const tableBody: string[][] = behaviorReports.map((behaviorReport) => {
    return [
      behaviorReport._id,
      format(new Date(behaviorReport.date), 'PPP'),
      behaviorReport.description,
      behaviorReport.severity,
      behaviorReport.resolved ? 'Yes' : 'No'
    ]
  })

  return (
    <div className='flex bg-bg-100 flex-col w-full min-h-screen'>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <h1 className='flex items-center text-xl font-bold'>
          Student Dashboard
          {
            isLoading
              ? <Skeleton className='w-48 h-7 ml-2' />
              : ` - ${student?.name} ${student?.lastName}`
          }
        </h1>
        <InfoCardSection studentId={student?._id ?? ''} attendance={attendance} averageGrades={averageGrades} behaviorReports={behaviorReports.length} isLoading={isLoading} />

        <div className='flex flex-col gap-4 md:gap-8'>
          <StadisticSection />

          {
            behaviorReports.length > 0
              ? <TableCard tableBody={tableBody} tableHeader={tableHeader} title='Behavior Reports' handleClick={() => {}} />
              : <TableCard tableBody={[['No behavior reports yet']]} tableHeader={tableHeader} title='Behavior Reports' handleClick={() => {}} />
          }
        </div>
      </main>
    </div>
  )
}

export default ViewGuardianStudentPage

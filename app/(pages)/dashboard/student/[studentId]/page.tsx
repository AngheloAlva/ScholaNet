'use client'

import Link from 'next/link'

import InfoCardSection from '@/app/components/dashboard/guardian/students/Info-card-section'
import TableDataSection from '@/app/components/dashboard/student/page/Table-data-section'
import useDashboardStudentData from '@/app/hooks/useDashboardStudentData'
import StudentName from '@/app/components/ui/Student-name'
import useStudentById from '@/app/hooks/useStudentById'
import { Button } from '@/app/components/ui/button'

function AlumnsPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const {
    student,
    isLoading,
    attendance,
    averageGrades,
    behaviorReports
  } = useStudentById(params.studentId)
  const { schedules } = useDashboardStudentData(params.studentId)

  return (
    <div className='flex bg-bg-100 flex-col w-full min-h-screen'>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <StudentName
          text='Welcome'
          name={student?.name}
          isLoading={isLoading}
          lastName={student?.lastName}
        />

        <Link href={`/dashboard/student/${params.studentId}/intranet`} className='w-full flex justify-center'>
          <Button className='w-full md:w-2/3 bg-accent-100 hover:opacity-80 hover:bg-accent-100'>Go to Intranet</Button>
        </Link>

        <InfoCardSection
          isLoading={isLoading}
          attendance={attendance}
          averageGrades={averageGrades}
          behaviorReports={behaviorReports.length}
        />

        {
          (schedules != null) && (
            <TableDataSection schedules={schedules} />
          )
        }
      </main>
    </div>
  )
}

export default AlumnsPage

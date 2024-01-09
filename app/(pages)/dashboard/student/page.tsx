'use client'

import { getUserIdFromToken } from '@/app/lib/getUserIdFromToken'

import StudentName from '@/app/components/ui/Student-name'
import useStudentById from '@/app/hooks/useStudentById'
import InfoCardSection from '@/app/components/dashboard/guardian/students/Info-card-section'
import useDashboardStudentData from '@/app/hooks/useDashboardStudentData'
import TableDataSection from '@/app/components/dashboard/student/navbar/page/Table-data-section'

function AlumnsPage (): React.ReactElement {
  const studentId = getUserIdFromToken()
  const year = new Date().getFullYear().toString()
  const {
    student,
    isLoading,
    attendance,
    averageGrades,
    behaviorReports
  } = useStudentById(studentId)
  const { schedules } = useDashboardStudentData(studentId, year)

  return (
    <div className='flex bg-bg-100 flex-col w-full min-h-screen'>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <StudentName
          text='Welcome'
          name={student?.name}
          isLoading={isLoading}
          lastName={student?.lastName}
        />

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

'use client'

import useSemesterData from '@/app/hooks/useSemesterData'
import { useRouter } from 'next/navigation'

import CreateSemester from '@/app/components/dashboard/admin/forms/Create-semester'
import TableCard from '@/app/components/ui/Table-card'
import DataCard from '@/app/components/ui/Data-card'
import { RxSection } from 'react-icons/rx'

function AdminSemesterPage (): React.ReactElement {
  const router = useRouter()
  const { semesters, totalSemesters, reloadSemesters } = useSemesterData()
  const tableHeader: string[] = ['id', 'name', 'startDate', 'endDate']
  const tableBody: string[][] = semesters.length >= 1
    ? semesters.map(semester => {
      return [
        semester._id,
        semester.name,
        semester.startDate,
        semester.endDate
      ]
    })
    : [['No hay semestres']]

  const handleSemesterClick = (id: string): void => {
    router.push(`/dashboard/admin/semesters/${id}`)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<RxSection />}
        title={'Programs'}
        value={totalSemesters}
      />

      <TableCard tableHeader={tableHeader} handleClick={handleSemesterClick} tableBody={tableBody} title='Semesters' />

      <CreateSemester onSemesterCreated={reloadSemesters} />
    </main>
  )
}

export default AdminSemesterPage

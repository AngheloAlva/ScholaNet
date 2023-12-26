'use client'

import DataCard from '@/components/dashboard/admin/Data-card'
import TableCard from '@/components/dashboard/admin/Table-card'
import useStudentData from '@/hooks/useStudentData'
import format from 'date-fns/format'
import { PiStudent } from 'react-icons/pi'

function StudentsPage (): React.ReactElement {
  const { students, totalStudents } = useStudentData()
  const tableHeader: string[] = ['id', 'name', 'rut', 'date of birth', 'guardian', 'program', 'state']
  const tableBody: string[][] = students.length >= 1
    ? students.map(student => {
      return [
        student._id,
        student.name + ' ' + student.lastName,
        student.rut,
        format(student.dateOfBirth, 'ppp'),
        student.guardian,
        student.program,
        student.state
      ]
    })
    : [['No hay estudiantes']]

  const handleStudentClick = (id: string): void => {
    console.log(id)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<PiStudent />}
        title={'Students'}
        value={totalStudents}
      />

      <TableCard
        tableHeader={tableHeader}
        handleClick={handleStudentClick}
        tableBody={tableBody}
        title='Students'
      />
    </main>
  )
}

export default StudentsPage

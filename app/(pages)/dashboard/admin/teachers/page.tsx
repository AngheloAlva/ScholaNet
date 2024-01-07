'use client'

import useTeacherData from '@/app/hooks/useTeacherData'

import TableCard from '@/app/components/ui/Table-card'
import DataCard from '@/app/components/ui/Data-card'
import { PiChalkboardTeacher } from 'react-icons/pi'

function TeachersPage (): React.ReactElement {
  const { teachers, totalTeachers } = useTeacherData()
  const tableHeader: string[] = ['id', 'name', 'rut', 'email', 'role', 'students', 'state']
  const tableBody: string[][] = teachers.length >= 1
    ? teachers.map(teacher => {
      return [
        teacher._id,
        teacher.name + ' ' + teacher.lastName,
        teacher.rut,
        teacher.email,
        teacher.role,
        teacher.students?.length === 0
          ? 'No students'
          : teacher.students.map(student => student.name).join(', '),
        teacher.state
      ]
    })
    : [['No hay profesores']]

  const handleTeacherClick = (id: string): void => {
    console.log(id)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<PiChalkboardTeacher />}
        title={'Teachers'}
        value={totalTeachers}
      />

      <TableCard
        tableHeader={tableHeader}
        handleClick={handleTeacherClick}
        tableBody={tableBody}
        title='Teachers'
      />
    </main>
  )
}

export default TeachersPage

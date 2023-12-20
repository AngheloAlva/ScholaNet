'use client'

import DataCard from '@/components/dashboard/admin/Data-card'
import { FaConnectdevelop } from 'react-icons/fa6'

import CreateProgram from '@/components/dashboard/admin/forms/Create-program'
import TableCard from '@/components/dashboard/admin/Table-card'
import useProgramData from '@/hooks/useProgramData'

function AdminProgramsPage (): React.ReactElement {
  const { programs, totalPrograms } = useProgramData()
  const tableHeader: string[] = ['id', 'name', 'description']
  const tableBody: string[][] = programs.length >= 1
    ? programs.map(program => {
      return [
        program._id,
        program.name,
        program.description
      ]
    })
    : [['No hay programas']]

  return (
    <main className='pt-7 pb-14 flex flex-col gap-4 w-screen px-5'>
      <DataCard
        icon={<FaConnectdevelop />}
        title={'Programs'}
        value={totalPrograms}
      />

      <TableCard tableHeader={tableHeader} tableBody={tableBody} title='Programs' />

      <CreateProgram />
    </main>
  )
}

export default AdminProgramsPage

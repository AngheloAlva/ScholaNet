'use client'

import useProgramData from '@/app/hooks/useProgramData'
import { useRouter } from 'next/navigation'

import CreateProgram from '@/app/components/dashboard/admin/forms/Create-program'
import TableCard from '@/app/components/ui/Table-card'
import DataCard from '@/app/components/ui/Data-card'
import { FaConnectdevelop } from 'react-icons/fa6'

function AdminProgramsPage (): React.ReactElement {
  const router = useRouter()
  const { programs, totalPrograms, reloadPrograms } = useProgramData()
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

  const handleProgramClick = (id: string): void => {
    router.push(`/dashboard/admin/programs/${id}`)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<FaConnectdevelop />}
        title={'Programs'}
        value={totalPrograms}
      />

      <TableCard tableHeader={tableHeader} handleClick={handleProgramClick} tableBody={tableBody} title='Programs' />

      <CreateProgram onProgramCreated={reloadPrograms} />
    </main>
  )
}

export default AdminProgramsPage

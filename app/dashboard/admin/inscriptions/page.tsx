'use client'

import useInscriptionData from '@/hooks/useInscriptionData'
import format from 'date-fns/format'

import TableCard from '@/components/dashboard/admin/Table-card'
import DataCard from '@/components/dashboard/admin/Data-card'

function InscriptionsPage (): React.ReactElement {
  const { inscriptions, totalInscriptions } = useInscriptionData()
  const tableHeader: string[] = ['id', 'student', 'program', 'status', 'enrollment date']
  const tableBody: string[][] = inscriptions.length >= 1
    ? inscriptions.map(inscription => {
      return [
        inscription._id,
        inscription.student,
        inscription.program,
        inscription.status,
        format(inscription.enrollmentDate, 'ppp')
      ]
    })
    : [['No hay inscripciones']]

  const handleInscriptionClick = (id: string): void => {
    console.log(id)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<></>}
        title={'Inscriptions'}
        value={totalInscriptions}
      />

      <TableCard
        tableHeader={tableHeader}
        handleClick={handleInscriptionClick}
        tableBody={tableBody}
        title='Inscriptions'
      />
    </main>
  )
}

export default InscriptionsPage

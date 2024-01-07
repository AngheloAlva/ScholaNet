'use client'

import useGuardianByIdData from '@/app/hooks/useGuardianByIdData'
import { getUserIdFromToken } from '@/app/lib/getUserIdFromToken'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import TableCard from '@/app/components/ui/Table-card'
import UserTitle from '@/app/components/ui/User-title'
import { Button } from '@/app/components/ui/button'

function DashboardPage (): React.ReactElement {
  const userId = getUserIdFromToken()
  const { guardian, students } = useGuardianByIdData(userId)
  const router = useRouter()

  const tableHeader: string[] = ['ID', 'Name', 'Last Name', 'RUT', 'Date of Birth', 'Program']
  const tableBody: string[][] = students.map((student) => {
    return [
      student._id,
      student.name,
      student.lastName,
      student.rut,
      new Date(student.dateOfBirth).toLocaleDateString('es-CL'),
      student.program.name
    ]
  })

  const handleStudentClick = (id: string): void => {
    router.push(`/dashboard/guardian/student/${id}`)
  }

  return (
    <>
      <header className='flex flex-col w-screen px-5 bg-bg-200 pb-10 items-center pt-16'>
        <div className='md:flex md:justify-between'>
          <UserTitle name={guardian.name + ' ' + guardian.lastName } />
          <Image src={'/intro-dashboard.png'} alt='Dashboard Presentation' width={768} height={500} className='md:w-96' />
        </div>
      </header>

      <main className='py-20 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
        {students.length > 0
          ? (<>
                <TableCard
                  tableBody={tableBody}
                  tableHeader={tableHeader}
                  handleClick={handleStudentClick}
                  title='Student(s)'
                />
                <p className='text-accent-foreground font-semibold text-sm mt-3'>
                  * Click on a student to see more details
                </p>
              </>)
          : (
              <div className='flex items-center flex-col justify-center gap-4'>
                <p className='text-xl font-semibold'>No students registered</p>
                <Button className='text-lg'>
                  <Link href={'/dashboard/guardian/add-student'}>
                    Add a student to your account
                  </Link>
                </Button>
              </div>
            )}
      </main>
    </>
  )
}

export default DashboardPage

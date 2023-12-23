'use client'

import { getSemester, updateSemester } from '@/api/scholanet/semester'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SemesterForm from '@/components/dashboard/admin/forms/Semester-form'
import { useToast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { FaAngleLeft } from 'react-icons/fa6'

import type { Semester } from '@/types/schola-net/semester'

function SemesterByIdPage ({ params }: { params: { semesterId: string } }): React.ReactElement {
  const [semester, setSemester] = useState<Semester>()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchSemester = async (): Promise<void> => {
      const fetchedSemester = await getSemester(params.semesterId)
      setSemester(fetchedSemester)
    }

    void fetchSemester()
  }, [params.semesterId])

  const handleUpdate = async (updatedData: any): Promise<void> => {
    try {
      await updateSemester({ id: semester?._id, ...updatedData })
      toast({
        title: 'Semester updated successfully',
        description: 'The semester has been updated successfully.',
        duration: 2000
      })
      router.push('/dashboard/admin/semesters')
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred while updating the semester.',
        duration: 2000
      })
    }
  }

  return (
    <main className='px-5 mb-20 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <Link href={'/dashboard/admin/semesters'} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>
            {
              ((semester?._id) != null)
                ? 'Semester ID: ' + semester?._id
                : <Skeleton className='w-full h-6 bg-bg-200' />
            }
          </CardTitle>
          <CardDescription>
            Change the details of the semester below.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <SemesterForm initialValues={semester ?? { name: '', endDate: '', startDate: '' }} onSubmit={handleUpdate} />
        </CardContent>
      </Card>
    </main>
  )
}

export default SemesterByIdPage

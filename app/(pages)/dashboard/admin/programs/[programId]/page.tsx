'use client'

import { getProgram, updateProgram } from '@/api/scholanet/program'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import ProgramForm from '@/app/components/dashboard/admin/forms/Program-form'
import { useToast } from '@/app/components/ui/use-toast'
import { Skeleton } from '@/app/components/ui/skeleton'
import { FaAngleLeft } from 'react-icons/fa6'

import type { Program } from '@/types/schola-net/program'

function ProgramByIdPage ({ params }: { params: { programId: string } }): React.ReactElement {
  const [program, setProgram] = useState<Program>()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProgram = async (): Promise<void> => {
      const fetchedProgram = await getProgram(params.programId)
      setProgram(fetchedProgram)
    }

    void fetchProgram()
  }, [params.programId])

  const handleUpdate = async (updatedData: any): Promise<void> => {
    try {
      await updateProgram({ id: program?._id, ...updatedData })
      toast({
        title: 'Program updated successfully',
        description: 'The program has been updated successfully.',
        duration: 2000
      })
      router.push('/dashboard/admin/programs')
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred while updating the program.',
        duration: 2000
      })
    }
  }

  return (
    <main className='px-5 mb-20 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <Link href={'/dashboard/admin/programs'} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>
            {
              ((program?._id) != null)
                ? 'Program ID: ' + program?._id
                : <Skeleton className='w-full h-6 bg-bg-200' />
            }
          </CardTitle>
          <CardDescription>
            Change the name and description of the program here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgramForm initialValues={program ?? { name: '', description: '' }} onSubmit={handleUpdate} />
        </CardContent>
      </Card>
    </main>
  )
}

export default ProgramByIdPage

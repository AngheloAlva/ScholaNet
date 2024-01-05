import Link from 'next/link'

import { Button } from '@/components/ui/button'
import MaterialItem from './Material-item'

import type { Material } from '@/types/course/material'

interface Props {
  materials: Material[]
  teacherId: string
  courseId: string
}

function MaterialsSection ({
  teacherId, courseId, materials
}: Props): React.ReactElement {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Materials</h2>
        <Link href={`/dashboard/teacher/${teacherId}/intranet/${courseId}/materials/create`}>
          <Button variant={'outline'}>
            Create evaluation
          </Button>
        </Link>
      </div>

      <ul className='flex flex-col items-start justify-center w-full h-full gap-2'>
        {
          materials.length === 0
            ? <p>No materials</p>
            : materials?.map((material) => (
                <MaterialItem material={material} />
            ))
        }
      </ul>
    </div>
  )
}

export default MaterialsSection

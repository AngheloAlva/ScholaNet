import MaterialItem from '../ui/Material-item'

import type { Material } from '@/types/course/material'
import CreateMaterialForm from '../forms/Create-material'

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
        <CreateMaterialForm courseInstanceId={courseId} />
      </div>

      <ul className='flex pl-2 mt-4 flex-col items-start justify-center w-full h-full gap-2'>
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

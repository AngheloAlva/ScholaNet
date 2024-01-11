import MaterialItem from '../ui/Material-item'

import type { Material } from '@/types/course/material'

interface Props {
  materials: Material[]
}

function MaterialsSection ({
  materials
}: Props): React.ReactElement {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Materials</h2>
      </div>

      <ul className='flex pl-2 mt-4 flex-col items-start justify-center w-full h-full gap-2'>
        {
          materials.length === 0
            ? <p>No materials</p>
            : materials?.map((material) => (
              <MaterialItem
                key={material._id}
                material={material}
              />
            ))
        }
      </ul>
    </div>
  )
}

export default MaterialsSection

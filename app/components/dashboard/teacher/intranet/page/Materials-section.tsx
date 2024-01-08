import { deleteMaterial } from '@/api/course/material'

import CreateMaterialForm from '../forms/Create-material'
import { useToast } from '@/app/components/ui/use-toast'
import MaterialItem from '../ui/Material-item'

import type { Material } from '@/types/course/material'

interface Props {
  materials: Material[]
  courseId: string
  reloadMaterials: () => Promise<void>
}

function MaterialsSection ({
  courseId, materials, reloadMaterials
}: Props): React.ReactElement {
  const { toast } = useToast()

  const handleDeleteMaterial = async (materialId: string): Promise<void> => {
    try {
      await deleteMaterial(materialId)
      void reloadMaterials()
      toast({
        title: 'Material deleted',
        description: 'The material was deleted successfully',
        duration: 2500
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred',
        duration: 2500
      })
    }
  }

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
                <MaterialItem
                material={material}
                handleDeleteMaterial={handleDeleteMaterial}
              />
            ))
        }
      </ul>
    </div>
  )
}

export default MaterialsSection

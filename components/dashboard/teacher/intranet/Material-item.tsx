import type { Material } from '@/types/course/material'

function MaterialItem (
  { material }: { material: Material }
): React.ReactElement {
  return (
    <li key={material._id} className='flex flex-col items-start justify-center w-full h-full gap-2'>
      <h3 className='text-xl font-bold'>{material.title}</h3>
      <p>{material.description}</p>
    </li>
  )
}

export default MaterialItem

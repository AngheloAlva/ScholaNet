import { Button } from '@/components/ui/button'
import type { Material } from '@/types/course/material'

function MaterialItem (
  { material }: { material: Material }
): React.ReactElement {
  return (
    <li key={material._id} className='flex justify-between w-full h-full'>
      <div>
        <h3 className='font-bold'>{material.title}</h3>
        <p>{material.description}</p>
       </div>
      <Button variant={'link'}>
        {/* //! Fix redirect <a> tag */}
        <a href={material.url} target='_blank'>
          {material.type === 'pdf' ? 'View' : 'Download'} {material.type}
        </a>
      </Button>
    </li>
  )
}

export default MaterialItem

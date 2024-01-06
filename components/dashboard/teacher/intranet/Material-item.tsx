import { Button } from '@/components/ui/button'
import type { Material } from '@/types/course/material'

function MaterialItem (
  { material }: { material: Material }
): React.ReactElement {
  const isVideo: boolean = material.type === 'video'

  return (
    <li key={material._id} className='flex justify-between w-full h-full text-text-100'>
      <div>
        <h3 className='font-bold'>{material.title}</h3>
        <p>{material.description}</p>
      </div>
      <Button variant={'link'}>
        {
          isVideo
            ? <a href={material.url} download>Download video</a>
            : <a href={material.url} target='_blank'>
                {material.type === 'pdf' ? 'View' : 'Go'} {material.type}
              </a>

        }
      </Button>
    </li>
  )
}

export default MaterialItem

import { UploadButton } from '@/utils/uploadthing'

import { useToast } from '@/components/ui/use-toast'

interface Props {
  type: string
  handleUploadFile: (res: Array<{ serverData: { fileUrl: { url: any } } }>) => void
}

function TypeUploadButton (
  { type, handleUploadFile }: Props
): React.ReactElement {
  const { toast } = useToast()

  return (
    <div>
      {
        type === 'pdf' && (
          <UploadButton
            endpoint='pdfUploader'
            onClientUploadComplete={handleUploadFile}
            onUploadError={(error: Error) => {
              toast({
                title: 'Error',
                duration: 3000,
                description: error.message
              })
            }}
          />
        )
      }

      {
        type === 'video' && (
          <UploadButton
            endpoint='videoUploader'
            onClientUploadComplete={handleUploadFile}
            onUploadError={(error: Error) => {
              toast({
                title: 'Error',
                duration: 3000,
                description: error.message
              })
            }}
          />
        )
      }
    </div>
  )
}

export default TypeUploadButton

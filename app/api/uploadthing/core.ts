/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file }
    }),
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file }
    }),
  videoUploader: f({ video: { maxFileSize: '32MB' } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

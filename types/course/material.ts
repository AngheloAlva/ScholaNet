export interface Material {
  _id: string
  title: string
  description: string
  type: 'pdf' | 'link' | 'file'
  url: string
  courseInstance: string
}

export interface CreateMaterial {
  title: string
  description: string
  type: string
  url: string
  courseInstance: string
}

export interface UpdateMaterial {
  id: string
  title: string
  description: string
  type: 'pdf' | 'link' | 'file'
  url: string
}

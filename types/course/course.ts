export interface Course {
  _id: string
  title: string
  description: string
  program: string
  image: string
  href: string
  section: string
}

export interface CreateCourse {
  title: string
  description: string
  program: string
  image: string
  href: string
  section: string
}

export interface UpdateCourse {
  _id: string
  title?: string
  description?: string
  image?: string
  href?: string
}
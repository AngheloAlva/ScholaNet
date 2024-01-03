import type { CourseInstance } from '@/types/course/course-instance'

export function reorder (list: CourseInstance[], startIndex: any, endIndex: any): any {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export function move (sourceList: CourseInstance[], destList: CourseInstance[], source: any, destination: any): any {
  const sourceClone = Array.from(sourceList)
  const destClone = Array.from(destList)
  const [removed] = sourceClone.splice(source.index, 1)

  destClone.splice(destination.index, 0, removed)

  const result: Record<string, CourseInstance[]> = {}
  result[source.droppableId] = sourceClone
  result[destination.droppableId] = destClone

  return result
}

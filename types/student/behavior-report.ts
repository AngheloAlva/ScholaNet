export interface BehaviorReport {
  date: Date
  student: string
  description: string
  severity: 'mild' | 'moderate' | 'severe'
  resolved: boolean
}

export interface UpdateBehaviorReport {
  id: string
  description?: string
  severity?: 'mild' | 'moderate' | 'severe'
  resolved?: boolean
}

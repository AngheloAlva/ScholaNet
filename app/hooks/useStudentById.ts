import { calculateAttendancePercentage } from '@/app/helpers/calculateAttendancePercentage'
import { getBehaviorReportsByStudent } from '@/api/student/behavior-report'
import { getAverageGradeByStudent } from '@/api/course/course-instance'
import { getAttendanceByPerson } from '@/api/course/attendance'
import { getStudent } from '@/api/student/student'
import { useEffect, useState } from 'react'

import { useToast } from '@/app/components/ui/use-toast'

import type { BehaviorReport } from '@/types/student/behavior-report'
import type { Student } from '@/types/student/student'

interface Response {
  student: Student | undefined
  isLoading: boolean
  averageGrades: Record<string, number>
  attendance: number
  behaviorReports: BehaviorReport[]
}

const useStudentById = (id: string): Response => {
  const [averageGrades, setAverageGrades] = useState<Record<string, number>>({})
  const [behaviorReports, setBehaviorReports] = useState<BehaviorReport[]>([])
  const [attendance, setAttendance] = useState<number>(0)
  const [student, setStudent] = useState<Student | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStudent = async (): Promise<void> => {
      try {
        const studentData = await getStudent(id)
        setStudent(studentData)

        const attendanceData = await getAttendanceByPerson(id)
        const attendanceDays = calculateAttendancePercentage(attendanceData, 180)
        setAttendance(attendanceDays)

        const behaviorReports = await getBehaviorReportsByStudent(id)
        setBehaviorReports(behaviorReports)

        const gradesPromises = studentData.courseInstances.map(async courseInstance =>
          await getAverageGradeByStudent({ courseInstanceId: courseInstance._id, studentId: id })
        )
        const grades = await Promise.all(gradesPromises)
        const gradesMap = studentData.courseInstances.reduce<Record<string, number>>((acc, courseInstance, index) => {
          acc[courseInstance._id] = Number(grades[index])
          return acc
        }, {})

        setAverageGrades(gradesMap)
      } catch (error) {
        toast({
          title: 'Error',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 3000
        })
      } finally {
        setIsLoading(false)
      }
    }

    void fetchStudent()
  }, [id])

  return {
    student,
    isLoading,
    averageGrades,
    attendance,
    behaviorReports
  }
}

export default useStudentById

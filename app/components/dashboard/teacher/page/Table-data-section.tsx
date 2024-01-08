import format from 'date-fns/format'

import TableCard from '@/app/components/ui/Table-card'

import type { CourseInstance } from '@/types/course/course-instance'
import type { SimpleSchedule } from '@/types/course/schedule'
import type { Evaluation } from '@/types/course/evaluation'

interface TableDataSectionProps {
  schedules: SimpleSchedule[]
  courseInstances: CourseInstance[]
  evaluations: Evaluation[]
}

function TableDataSection ({
  schedules, courseInstances, evaluations
}: TableDataSectionProps): React.ReactElement {
  const courseInstancesBody: string[][] = courseInstances.length === 0
    ? [['No course instances found']]
    : courseInstances.map((courseInstance) => (
      [
        courseInstance._id,
        courseInstance.course.title,
        courseInstance.classroom,
        courseInstance.semester.name,
        courseInstance.academicYear
      ]
    ))

  const schedulesBody: string[][] = schedules.length === 0
    ? [['No schedules found']]
    : schedules.map((schedule) => (
      [
        schedule.courseInstance.classroom,
        schedule.startTime,
        schedule.endTime,
        schedule.courseInstance.course,
        schedule._id
      ]
    ))

  const evaluationsBody: string[][] = evaluations.length === 0
    ? [['No evaluations found']]
    : evaluations.map((evaluation) => (
      [
        evaluation.title,
        evaluation.courseInstance.classroom,
        format(new Date(evaluation.dueDate), 'PPP'),
        evaluation.description,
        evaluation.type,
        (evaluation.totalScore !== undefined) ? evaluation.totalScore.toString() : 'N/A'
      ]
    ))

  return (
    <>
      <div>
        <TableCard
          title='Schedules this Day'
          tableHeader={['Classroom', 'Start Time', 'End Time', 'Course', 'ID']}
          tableBody={schedulesBody}
        />
      </div>
      <div>
        <TableCard
          title='Course Instances this year'
          tableHeader={['ID', 'Course', 'Classroom', 'Academic Year', 'Semester']}
          tableBody={courseInstancesBody}
        />
      </div>
      <div>
        <TableCard
          title='Evaluations this year'
          tableHeader={['Title', 'Course Instance', 'Due Date', 'Description', 'Type', 'Total Score']}
          tableBody={evaluationsBody}
        />
      </div>
    </>
  )
}

export default TableDataSection

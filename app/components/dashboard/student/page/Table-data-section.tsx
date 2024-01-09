import TableCard from '@/app/components/ui/Table-card'

import type { Schedule } from '@/types/course/schedule'

interface TableDataSectionProps {
  schedules: Schedule
}

function TableDataSection ({
  schedules
}: TableDataSectionProps): React.ReactElement {
  const todayCourses = schedules?.days.filter((day) => day.day === 'Monday')

  const todaySchedulesBody: string[][] = todayCourses?.length === 0
    ? [['No schedules found']]
    : todayCourses?.map((course) => (
      [
        course.blocks[0].courseInstance.classroom,
        course.blocks[0].startTime,
        course.blocks[0].endTime,
        course.blocks[0].courseInstance.course.title
      ]
    ))

  const schedulesBody: string[][] = schedules?.days.length === 0
    ? [['No schedules found']]
    : schedules?.days.map((day) => (
      day.blocks.map((block) => (
        [
          block.courseInstance.classroom,
          block.startTime,
          block.endTime,
          block.courseInstance.course.title
        ]
      )).flat(1)
    ))

  return (
    <>
      <TableCard
        title='Schedules this Day'
        tableHeader={['Classroom', 'Start Time', 'End Time', 'Course']}
        tableBody={todaySchedulesBody}
      />
      <TableCard
        title='Schedules'
        tableHeader={['Classroom', 'Start Time', 'End Time', 'Course']}
        tableBody={schedulesBody}
      />
    </>
  )
}

export default TableDataSection

'use client'

import useCourseInstanceData from '@/hooks/useCourseInstanceData'
import useTeacherData from '@/hooks/useTeacherData'
import useStudentData from '@/hooks/useStudentData'
import useUserData from '@/hooks/useGuardiansData'

import { FiUsers, FiBook, FiShield } from 'react-icons/fi'
import { PiChalkboardTeacher } from 'react-icons/pi'
import DataCard from './Data-card'

const iconStyle = 'w-4 h-4 text-gray-500 dark:text-gray-400'

function DataCardSection (): React.ReactElement {
  const { totalStudents } = useStudentData()
  const { totalCourseInstances } = useCourseInstanceData()
  const { totalTeachers } = useTeacherData()
  const { totalUsers } = useUserData()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DataCard
        title='Total Students'
        value={totalStudents}
        icon={<FiUsers className={iconStyle} />}
      />
      <DataCard
        title='Total Course Instances'
        value={totalCourseInstances}
        icon={<FiBook className={iconStyle} />}
      />
      <DataCard
        title='Total Teachers'
        value={totalTeachers}
        icon={<PiChalkboardTeacher className={iconStyle} />}
      />
      <DataCard
        title='Total Users'
        value={totalUsers}
        icon={<FiShield className={iconStyle} />}
      />
    </div>
  )
}

export default DataCardSection

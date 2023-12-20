import TableCard from '@/components/dashboard/admin/Table-card'
import DataCard from '@/components/dashboard/admin/Data-card'
import { FiUsers, FiBook, FiShield } from 'react-icons/fi'
import { PiChalkboardTeacher } from 'react-icons/pi'

function AdminPage (): React.ReactElement {
  const handleClickExample = (id: string): void => {
    console.log(id)
  }

  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DataCard title='Total Students' value={2350} icon={<FiUsers className="w-4 h-4 text-gray-500 dark:text-gray-400" />} />
          <DataCard title='Total Courses' value={75} icon={<FiBook className="w-4 h-4 text-gray-500 dark:text-gray-400" />} />
          <DataCard title='Total Teachers' value={120} icon={<PiChalkboardTeacher className="w-4 h-4 text-gray-500 dark:text-gray-400" />} />
          <DataCard title='Total Guardians' value={500} icon={<FiShield className="w-4 h-4 text-gray-500 dark:text-gray-400" />} />
        </div>
        <div>
          <TableCard
            title='Course Instances'
            tableHeader={['ID', 'Name', 'Course', 'Grade']}
            tableBody={[
              ['STU001', 'John Doe', 'Mathematics', 'A'],
              ['STU002', 'Jane Doe', 'Science', 'B'],
              ['STU003', 'Richard Roe', 'History', 'C']
            ]}
            />
        </div>
      </main>
    </div>
  )
}

export default AdminPage

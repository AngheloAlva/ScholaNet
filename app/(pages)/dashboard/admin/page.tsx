import DataCardSection from '@/app/components/dashboard/admin/page/Data-card-section'
import TableCard from '@/app/components/ui/Table-card'

function AdminPage (): React.ReactElement {
  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <DataCardSection />
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

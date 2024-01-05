import TeacherNavBar from '@/components/dashboard/teacher/Teacher-navbar'
import Footer from '@/components/home/footer/Footer'

function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <TeacherNavBar />
      {children}
      <Footer />
    </>
  )
}

export default DashboardLayout

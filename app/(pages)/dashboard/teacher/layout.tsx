import TeacherNavBar from '@/app/components/dashboard/teacher/navbar/Teacher-navbar'
import Footer from '@/app/components/home/footer/Footer'

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

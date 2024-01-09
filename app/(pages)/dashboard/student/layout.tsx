import StudentNavBar from '@/app/components/dashboard/student/navbar/Student-navbar'
import Footer from '@/app/components/home/footer/Footer'

function StudentDashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <StudentNavBar />
      {children}
      <Footer />
    </>
  )
}

export default StudentDashboardLayout

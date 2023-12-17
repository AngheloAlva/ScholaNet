import DashboardNavbar from '@/components/dashboard/navbar/Navbar'
import Footer from '@/components/home/footer/Footer'

function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      {/* <DashboardNavbar /> */}
      {children}
      <Footer />
    </>
  )
}

export default DashboardLayout

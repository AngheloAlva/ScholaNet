import GuardianNavbar from '@/components/dashboard/guardian/Guardian-navbar'
import Footer from '@/components/home/footer/Footer'

function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <GuardianNavbar />
      {children}
      <Footer />
    </>
  )
}

export default DashboardLayout

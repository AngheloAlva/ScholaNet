import GuardianNavbar from '@/app/components/dashboard/guardian/navbar/Guardian-navbar'
import Footer from '@/app/components/home/footer/Footer'

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

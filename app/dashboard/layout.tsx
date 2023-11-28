import DashboardNavbar from '@/components/dashboard/navbar/Navbar'

function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  )
}

export default DashboardLayout

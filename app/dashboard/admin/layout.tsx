import AdminNavbar from '@/components/dashboard/admin/navbar/Admin-navbar'
import Footer from '@/components/home/footer/Footer'

function AdminDashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <AdminNavbar />
      {children}
      <Footer />
    </>
  )
}

export default AdminDashboardLayout

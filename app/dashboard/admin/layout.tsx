import AdminNavbar from '@/components/dashboard/admin/navbar/Navbar'

function AdminDashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  )
}

export default AdminDashboardLayout

import AdminNavbar from '@/components/dashboard/admin/navbar/Admin-navbar'

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

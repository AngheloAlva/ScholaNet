import Footer from '@/components/home/footer/Footer'

function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default DashboardLayout

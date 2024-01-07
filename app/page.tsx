import IntroducctionSection from './components/home/page/Presentation-section'
import BenefictsSection from './components/home/page/Beneficts-section'
import CoursesSection from './components/home/page/Courses-section'
import HeaderSection from './components/home/page/Header-section'
import Footer from '@/app/components/home/footer/Footer'
import Navbar from '@/app/components/home/navbar/Navbar'

function Home (): React.ReactElement {
  return (
    <>
      <Navbar />
      <HeaderSection />
      <IntroducctionSection />
      <CoursesSection />
      <BenefictsSection />
      <Footer />
    </>
  )
}

export default Home

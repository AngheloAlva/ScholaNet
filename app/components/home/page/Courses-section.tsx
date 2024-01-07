import CourseSection from '../ui/Course-section'

import { coursesSections } from '@/data/home-sections'

function CoursesSection (): React.ReactElement {
  return (
    <section>
      {
        coursesSections.map(section => (
          <CourseSection
            key={section.title}
            title={section.title}
            subTitle={section.subTitle}
            description={section.description}
            courses={section.courses}
          />
        ))
      }
    </section>
  )
}

export default CoursesSection

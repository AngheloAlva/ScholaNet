import type { BeneficCardProps } from '@/components/home/Benefic-card'

import primaryCourses from '@/data/primary-courses.json'
import secondayCourses from '@/data/secondary-courses.json'
import specialCourses from '@/data/special-courses.json'
import workshopsCourses from '@/data/workshops-courses.json'

export const coursesSections = [
  {
    title: 'Primary Programs: Building Strong Foundations',
    description: 'Our primary courses are designed to spark curiosity and instill a love of learning in young minds. We offer a diverse range of subjects that cater to the developmental needs of each child, nurturing their unique talents and interests. Through engaging activities and hands-on learning, students embark on an exciting educational adventure.',
    courses: primaryCourses
  },
  {
    title: 'Secondary Courses: Preparing for Future Success',
    description: 'Our secondary programs challenge students to think critically and creatively. Covering a wide array of subjects, from the sciences to the humanities, we equip learners with the knowledge and skills needed for academic and personal growth. Our courses encourage deep understanding and practical application, preparing students for higher education and beyond.',
    courses: secondayCourses
  },
  {
    title: 'Specialized Programs: Exploring New Horizons',
    description: 'ScholaNet\'s specialized programs offer unique learning opportunities in areas like technology, arts, and languages. These courses are designed to broaden horizons and develop specific skills, empowering students to pursue their passions and interests. Our expert educators guide students through immersive experiences that inspire innovation and creativity.',
    courses: specialCourses
  },
  {
    title: 'Workshops: Hands-On Learning Experiences',
    description: 'Our workshops provide a platform for students to engage in practical, hands-on learning. From robotics to creative writing, these sessions are tailored to offer in-depth exploration and skill development. Workshops are an integral part of our educational approach, allowing students to apply their learning in real-world contexts.',
    courses: workshopsCourses
  }
]

export const beneficCards: BeneficCardProps[] = [
  {
    title: 'Collaborative Learning',
    description: 'Fostering teamwork and shared knowledge through interactive group activities and discussions.',
    image: '/benefics/collaborative-learning.png'
  },
  {
    title: 'Innovative Teaching',
    description: 'Utilizing cutting-edge teaching methods to make learning more engaging and effective.',
    image: '/benefics/innovative-teaching.png'
  },
  {
    title: 'Personalized Education',
    description: 'Tailoring the educational experience to suit individual learning styles and paces.',
    image: '/benefics/personalized-education.png'
  }
]

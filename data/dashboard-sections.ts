import type { CourseIconProps } from '@/app/components/ui/Course-icon'
export const coursesIcons: CourseIconProps[] = [
  {
    image: '/courses-icons/primary-icon.png',
    alt: 'Alumns section image',
    buttonText: 'Go to Alumns',
    href: '/dashboard/alumns'
  },
  {
    image: '/courses-icons/secondary-icon.png',
    alt: 'Payments section image',
    buttonText: 'Go to Payments',
    href: '/dashboard/payments'
  },
  {
    image: '/courses-icons/workshop-icon.png',
    alt: 'Support section image',
    buttonText: 'Go to Support',
    href: '/dashboard/support'
  },
  {
    image: '/courses-icons/special-icon.png',
    alt: 'Announcements section image',
    buttonText: 'Go to Announcements',
    href: '/dashboard/announcements'
  }
]

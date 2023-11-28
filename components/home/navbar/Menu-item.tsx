import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface MenuItemProps {
  text: React.ReactNode
  href: string
  className?: string
}

function MenuItem ({ text, className, href }: MenuItemProps): React.ReactElement {
  return (
    <Link href={href} className={cn('hover:bg-accent-100 hover:text-bg-100 w-full rounded-sm py-1 transition-colors text-left px-4', className)}>
      {text}
    </Link>
  )
}

export default MenuItem

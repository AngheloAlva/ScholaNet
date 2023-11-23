import React from 'react'
import { cn } from '@/lib/utils'

interface MenuItemProps {
  text: React.ReactNode
  className?: string
}

function MenuItem ({ text, className }: MenuItemProps): React.ReactElement {
  return (
    <li className={cn('hover:bg-bg-100 w-full rounded-sm py-1 transition-colors text-left px-4', className)}>
      {text}
    </li>
  )
}

export default MenuItem

/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { cn } from '@/app/lib/utils'

function Skeleton ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }

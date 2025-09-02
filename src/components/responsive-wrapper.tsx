import { cn } from "@/lib/utils"

interface ResponsiveWrapperProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveWrapper({ children, className }: ResponsiveWrapperProps) {
  return (
    <div className={cn(
      "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  )
}

export function ResponsiveGrid({ children, className }: ResponsiveWrapperProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
      className
    )}>
      {children}
    </div>
  )
}

export function ResponsiveStack({ children, className }: ResponsiveWrapperProps) {
  return (
    <div className={cn(
      "flex flex-col space-y-4 sm:space-y-6",
      className
    )}>
      {children}
    </div>
  )
}

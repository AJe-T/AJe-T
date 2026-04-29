import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center p-8 text-center", className)}
      {...props}
    >
      <div className="bg-neutral-50 p-4 rounded-full mb-4">
        <Icon className="w-12 h-12 text-neutral-300" strokeWidth={1.5} />
      </div>
      <h3 className="text-md font-semibold text-neutral-600 mb-1">{title}</h3>
      <p className="text-sm text-neutral-400 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}

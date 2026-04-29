import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "card" | "table-row" | "chart" | "stat"
}

export function LoadingSkeleton({ variant = "card", className, ...props }: LoadingSkeletonProps) {
  if (variant === "table-row") {
    return (
      <div className={cn("flex items-center space-x-4 py-4 border-b border-neutral-100", className)} {...props}>
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    )
  }

  if (variant === "chart") {
    return (
      <div className={cn("flex flex-col space-y-3", className)} {...props}>
        <Skeleton className="h-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  if (variant === "stat") {
    return (
      <div className={cn("p-5 border border-neutral-100 rounded-lg bg-white", className)} {...props}>
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    )
  }

  // default card
  return (
    <div className={cn("flex flex-col space-y-3", className)} {...props}>
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

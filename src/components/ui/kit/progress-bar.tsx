"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  label?: string
  color?: "purple" | "green" | "amber" | "red"
}

export function ProgressBar({ value, label, color = "purple", className, ...props }: ProgressBarProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const colorStyles = {
    purple: "bg-primary-500",
    green: "bg-success-500",
    amber: "bg-warning-500",
    red: "bg-danger-500",
  }

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <div className="flex justify-between items-center text-xs font-medium text-neutral-600">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            colorStyles[color]
          )}
          style={{ width: mounted ? `${Math.min(100, Math.max(0, value))}%` : "0%" }}
        />
      </div>
    </div>
  )
}

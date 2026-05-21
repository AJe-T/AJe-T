import * as React from "react"
import { cn } from "@/lib/utils"
import { StatusType } from "./status-badge"

export interface TimelineStep {
  label: string
  time?: string
  location?: string
  status: "active" | "completed" | "upcoming"
  variant?: StatusType | "default" | "info" | "success" | "warning" | "accent" | "danger" | "neutral"
}

interface StepTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
}

export function StepTimeline({ steps, className, ...props }: StepTimelineProps) {
  const getDotStyle = (status: TimelineStep["status"], variant: TimelineStep["variant"] = "default") => {
    if (status === "upcoming") return "bg-neutral-200 border-2 border-white"

    if (variant === "in_transit" || variant === "info") return "bg-info-500"
    if (variant === "delivered" || variant === "success") return "bg-success-500"
    if (variant === "pending" || variant === "warning") return "bg-warning-500"
    if (variant === "delayed" || variant === "accent") return "bg-accent-500"
    if (variant === "cancelled" || variant === "neutral") return "bg-neutral-400"
    if (variant === "overdue" || variant === "danger" || variant === "exception") return "bg-danger-500"

    return "bg-primary-500" // default for active/completed
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const dotStyle = getDotStyle(step.status, step.variant)

        return (
          <div key={index} className="flex relative">
            {/* Timeline Line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-[9px] top-7 bottom-[-8px] w-0.5",
                  step.status === "completed" ? "bg-primary-200" : "bg-neutral-100"
                )}
              />
            )}

            {/* Dot & Content */}
            <div className="flex gap-4 pb-6">
              <div className="relative mt-1 z-10 flex items-center justify-center w-5 h-5">
                {step.status === "active" && (
                  <span className={cn("absolute w-4 h-4 rounded-full opacity-75 animate-pulse-dot", dotStyle)} />
                )}
                <span className={cn("relative w-3 h-3 rounded-full shadow-sm", dotStyle)} />
              </div>

              <div className="flex flex-col pt-0.5">
                <span className={cn(
                  "text-sm font-semibold",
                  step.status === "upcoming" ? "text-neutral-400" : "text-neutral-800"
                )}>
                  {step.label}
                </span>

                {(step.time || step.location) && (
                  <div className="flex flex-col mt-1 gap-0.5">
                    {step.time && (
                      <span className="text-sm font-medium text-neutral-500">{step.time}</span>
                    )}
                    {step.location && (
                      <span className="text-xs font-medium text-neutral-400">{step.location}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"

export type StatusType =
  | "in_transit"
  | "delivered"
  | "pending"
  | "delayed"
  | "cancelled"
  | "overdue"
  | "exception"
  | "paid"
  | "failed"
  | "active"
  | "inactive"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType | string
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase()

  const config = {
    in_transit: { bg: "bg-info-100", text: "text-info-700", dot: "bg-info-500", label: "In Transit" },
    delivered: { bg: "bg-success-100", text: "text-success-700", dot: "bg-success-500", label: "Delivered" },
    pending: { bg: "bg-warning-100", text: "text-warning-700", dot: "bg-warning-500", label: "Pending" },
    delayed: { bg: "bg-accent-100", text: "text-accent-500", dot: "bg-accent-500", label: "Delayed" },
    cancelled: { bg: "bg-neutral-100", text: "text-neutral-500", dot: "bg-neutral-400", label: "Cancelled" },
    overdue: { bg: "bg-danger-100", text: "text-danger-700", dot: "bg-danger-500", label: "Overdue" },
    exception: { bg: "bg-danger-100", text: "text-danger-700", dot: "bg-danger-500", label: "Exception" },
    paid: { bg: "bg-success-100", text: "text-success-700", label: "Paid" },
    failed: { bg: "bg-danger-100", text: "text-danger-700", label: "Failed" },
    active: { bg: "bg-success-100", text: "text-success-700", dot: "bg-success-500", label: "Active" },
    inactive: { bg: "bg-neutral-100", text: "text-neutral-500", dot: "bg-neutral-400", label: "Inactive" },
  }

  // Fallback for unknown statuses
  const style = config[normalizedStatus as keyof typeof config] || {
    bg: "bg-neutral-100",
    text: "text-neutral-600",
    label: status
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
        style.bg,
        style.text,
        className
      )}
      {...props}
    >
      {'dot' in style && style.dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", style.dot)} />
      )}
      {style.label}
    </div>
  )
}

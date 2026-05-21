import * as React from "react"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card } from "./layout"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  label?: string
  value: string | number
  icon: LucideIcon
  iconBg: "purple" | "amber" | "green" | "red" | "blue"
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  trendLabel?: string
  className?: string
}

export function StatCard({
  title,
  label,
  value,
  icon: Icon,
  iconBg,
  trend,
  trendValue,
  trendLabel,
  className
}: StatCardProps) {
  const iconStyles = {
    purple: "bg-primary-100 text-primary-500",
    amber: "bg-accent-100 text-accent-500",
    green: "bg-success-100 text-success-500",
    red: "bg-danger-100 text-danger-500",
    blue: "bg-info-100 text-info-500",
  }

  return (
    <Card className={cn("flex flex-col justify-between", className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-1">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-800">{value}</span>
            {label && <span className="text-sm text-neutral-500">{label}</span>}
          </div>
        </div>
        <div className={cn("p-2.5 rounded-lg flex-shrink-0", iconStyles[iconBg])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
            trend === "up" && "bg-success-100 text-success-700",
            trend === "down" && "bg-danger-100 text-danger-700",
            trend === "neutral" && "bg-neutral-100 text-neutral-500"
          )}>
            {trend === "up" && <TrendingUp className="w-3 h-3" />}
            {trend === "down" && <TrendingDown className="w-3 h-3" />}
            {trend === "neutral" && <Minus className="w-3 h-3" />}
            <span>{trendValue}</span>
          </div>
          {trendLabel && (
            <span className="text-xs text-neutral-400">{trendLabel}</span>
          )}
        </div>
      )}
    </Card>
  )
}

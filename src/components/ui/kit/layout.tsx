import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg"
  hover?: boolean
}

export function Card({ className, padding = "md", hover = false, ...props }: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-100 bg-neutral-0 shadow-sm",
        hover && "transition-base hover:shadow-md",
        paddings[padding],
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
  className
}: {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-start justify-between mb-4", className)}>
      <div>
        {title && <h4 className="text-md font-semibold text-neutral-700">{title}</h4>}
        {subtitle && <p className="text-sm font-medium text-neutral-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 pt-4 border-t border-neutral-100", className)} {...props} />
}

export function PageHeader({
  title,
  subtitle,
  actions,
  className
}: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-100 gap-4", className)}>
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">{title}</h1>
        {subtitle && <p className="text-base font-regular text-neutral-600 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

export function Section({ gap = "md", className, ...props }: { gap?: "sm" | "md" | "lg" } & React.HTMLAttributes<HTMLDivElement>) {
  const gaps = { sm: "gap-4", md: "gap-6", lg: "gap-8" }
  return <div className={cn("flex flex-col", gaps[gap], className)} {...props} />
}

export function Grid({ cols = 1, gap = "md", responsive = true, className, ...props }: { cols?: 1 | 2 | 3 | 4 | 5, gap?: "sm" | "md", responsive?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  }
  const gaps = { sm: "gap-4", md: "gap-6" }

  return (
    <div
      className={cn(
        "grid",
        gaps[gap],
        gridCols[cols],
        responsive && "grid-cols-1 md:grid-cols-2 lg:grid-cols-" + cols,
        className
      )}
      {...props}
    />
  )
}

export function Stack({ gap = "md", className, ...props }: { gap?: "xs" | "sm" | "md" | "lg" } & React.HTMLAttributes<HTMLDivElement>) {
  const gaps = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6" }
  return <div className={cn("flex flex-col", gaps[gap], className)} {...props} />
}

export function Inline({ gap = "md", align = "center", className, ...props }: { gap?: "xs" | "sm" | "md", align?: "start" | "center" | "end" } & React.HTMLAttributes<HTMLDivElement>) {
  const gaps = { xs: "gap-2", sm: "gap-3", md: "gap-4" }
  const aligns = { start: "items-start", center: "items-center", end: "items-end" }
  return <div className={cn("flex flex-row", gaps[gap], aligns[align], className)} {...props} />
}

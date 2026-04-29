import * as React from "react"
import { cn } from "@/lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4
}

export function Heading({ level = 1, className, ...props }: HeadingProps) {
  const Comp = `h${level}` as const

  const styles = {
    1: "text-4xl font-bold text-neutral-800",
    2: "text-2xl font-bold text-neutral-800",
    3: "text-xl font-semibold text-neutral-800",
    4: "text-md font-semibold text-neutral-700",
  }

  return (
    <Comp
      className={cn(styles[level], className)}
      {...props}
    />
  )
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "caption" | "label" | "muted" | "micro"
}

export function Text({ variant = "body", className, ...props }: TextProps) {
  const styles = {
    body: "text-base font-regular text-neutral-600",
    caption: "text-sm font-medium text-neutral-400",
    label: "text-sm font-medium text-neutral-400",
    muted: "text-base font-regular text-neutral-400",
    micro: "text-xs font-medium text-neutral-400",
  }

  return (
    <p
      className={cn(styles[variant], className)}
      {...props}
    />
  )
}

export function TrackingId({ value, className, ...props }: { value: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-mono text-sm font-semibold text-primary-500", className)}
      {...props}
    >
      {value}
    </span>
  )
}

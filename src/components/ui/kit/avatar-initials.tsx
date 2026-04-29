import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarInitialsProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function AvatarInitials({ name, size = "md", className, ...props }: AvatarInitialsProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  // Simple hash function for consistent color selection based on name
  const getColorClass = (name: string) => {
    const colors = [
      "bg-primary-500",
      "bg-primary-400",
      "bg-primary-700",
      "bg-accent-500",
      "bg-info-500"
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  const sizes = {
    sm: "w-[32px] h-[32px] text-xs",
    md: "w-[40px] h-[40px] text-sm",
    lg: "w-[56px] h-[56px] text-lg",
    xl: "w-[96px] h-[96px] text-2xl",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0",
        getColorClass(name),
        sizes[size],
        className
      )}
      {...props}
    >
      {getInitials(name)}
    </div>
  )
}

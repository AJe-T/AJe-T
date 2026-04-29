import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep, className, ...props }: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center w-full", className)} {...props}>
      {steps.map((step, index) => {
        const isComplete = index < currentStep
        const isActive = index === currentStep

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300",
                  isComplete ? "bg-primary-500 text-white" :
                  isActive ? "bg-white border-2 border-primary-500 text-primary-500" :
                  "bg-neutral-200 text-neutral-500"
                )}
              >
                {isComplete ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  "absolute top-10 w-24 text-center text-xs font-medium",
                  isComplete || isActive ? "text-primary-700" : "text-neutral-400"
                )}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-colors duration-300",
                  index < currentStep ? "bg-primary-500" : "bg-neutral-200"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

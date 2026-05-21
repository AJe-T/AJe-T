"use client"
import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DrawerSheetProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  open: boolean
  onClose: () => void
  width?: "md" | "lg" | "xl"
  children: React.ReactNode
  footer?: React.ReactNode
}

export function DrawerSheet({ title, subtitle, open, onClose, width = "md", children, footer }: DrawerSheetProps) {
  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [open])

  if (!open) return null

  const widths = {
    md: "max-w-[480px]",
    lg: "max-w-[560px]",
    xl: "max-w-[680px]",
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        "relative w-full h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300 sm:rounded-l-xl overflow-hidden",
        widths[width]
      )}>
        <div className="flex items-start justify-between p-6 border-b border-neutral-100 shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
            {subtitle && <p className="text-sm font-medium text-neutral-400 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-neutral-25">
          {children}
        </div>

        {footer && (
          <div className="p-4 border-t border-neutral-100 bg-white flex justify-end gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

interface NotificationBadgeProps {
  count: number
  children: React.ReactNode
  className?: string
}

export function NotificationBadge({ count, children, className }: NotificationBadgeProps) {
  return (
    <div className={cn("relative inline-flex", className)}>
      {children}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}

// Simple Toast Provider using React Context (for mock purposes)
type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface ToastContextType {
  toast: (options: Omit<Toast, "id">) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider")
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((options: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...options }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-3 w-80 p-4 bg-white rounded-lg shadow-lg border animate-in slide-in-from-right-8 fade-in",
              t.type === "success" && "border-l-4 border-l-success-500",
              t.type === "error" && "border-l-4 border-l-danger-500",
              t.type === "info" && "border-l-4 border-l-info-500"
            )}
          >
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-neutral-800">{t.title}</h4>
              {t.description && <p className="text-xs text-neutral-500 mt-1">{t.description}</p>}
            </div>
            <button
              onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  destructive?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = false
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border-neutral-100 shadow-xl rounded-xl sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-neutral-800">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-neutral-500">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="bg-transparent text-neutral-600 hover:bg-neutral-50 border-neutral-200">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              destructive
                ? "bg-danger-500 text-white hover:bg-danger-700"
                : "bg-primary-500 text-white hover:bg-primary-600"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

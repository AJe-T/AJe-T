"use client"
import * as React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { ToastProvider } from "@/components/ui/kit"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/signin' || pathname === '/signup'

  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-neutral-25 min-h-screen font-sans antialiased text-neutral-600")}>
        <TooltipProvider>
          <ToastProvider>
            {isAuthPage ? (
              <main className="min-h-screen bg-neutral-25 flex flex-col items-center justify-center p-4">
                {children}
              </main>
            ) : (
              <div className="flex h-screen overflow-hidden">
                <Sidebar
                  collapsed={sidebarCollapsed}
                  onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                <div
                  className={cn(
                    "flex-1 flex flex-col transition-all duration-200 min-w-0 h-full",
                    sidebarCollapsed ? "ml-[64px]" : "ml-[240px]"
                  )}
                >
                  <Topbar />
                  <main className="flex-1 overflow-auto p-6 bg-neutral-25 custom-scrollbar relative">
                    <div className="max-w-[1600px] mx-auto w-full">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            )}
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}

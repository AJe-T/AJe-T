"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileBarChart,
  HelpCircle,
  LayoutDashboard,
  PackagePlus,
  Plus,
  Settings,
  Truck,
  Box
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarItem, AvatarInitials } from "@/components/ui/kit"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "fixed top-0 left-0 bottom-0 z-40 bg-neutral-50 border-r border-neutral-100 flex flex-col transition-all duration-200",
      collapsed ? "w-[64px]" : "w-[240px]"
    )}>
      {/* Top Section / Logo */}
      <div className="h-[64px] flex items-center px-4 shrink-0 border-b border-neutral-100">
        <div className="flex items-center gap-3 w-full">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shrink-0">
            <Box className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-lg font-bold text-neutral-800 leading-tight">LogiSaaS</span>
              <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider truncate">
                Logistics Management
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-4 shrink-0">
        <Button
          variant="default"
          className={cn(
            "bg-primary-500 hover:bg-primary-600 text-white w-full transition-all",
            collapsed ? "px-0" : "px-4 font-semibold"
          )}
        >
          <Plus className={cn("w-5 h-5", !collapsed && "mr-2")} />
          {!collapsed && "Create Shipment"}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1 custom-scrollbar">
        <SidebarGroup label="MAIN" collapsed={collapsed} items={
          <>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" active={pathname === '/dashboard'} collapsed={collapsed} />
            <SidebarItem icon={Truck} label="Shipments" href="/shipments" active={pathname === '/shipments'} collapsed={collapsed} badge={3} />
            <SidebarItem icon={PackagePlus} label="Bookings" href="/bookings" active={pathname === '/bookings'} collapsed={collapsed} />
            <SidebarItem icon={CreditCard} label="Payments" href="/payments" active={pathname === '/payments'} collapsed={collapsed} />
            <SidebarItem icon={BarChart2} label="Analytics" href="/analytics" active={pathname === '/analytics'} collapsed={collapsed} />
          </>
        } />

        <SidebarGroup label="MANAGEMENT" collapsed={collapsed} items={
          <>
            <SidebarItem icon={Building2} label="Vendors" href="/vendors" active={pathname === '/vendors'} collapsed={collapsed} />
            <SidebarItem icon={FileBarChart} label="Reports" href="/reports" active={pathname === '/reports'} collapsed={collapsed} />
          </>
        } />

        <div className="mt-auto">
          <SidebarGroup collapsed={collapsed} items={
            <>
              <SidebarItem icon={HelpCircle} label="Support" href="/support" active={pathname === '/support'} collapsed={collapsed} />
              <SidebarItem icon={Settings} label="Settings" href="/settings" active={pathname === '/settings'} collapsed={collapsed} />
            </>
          } />
        </div>
      </div>

      {/* Bottom Profile & Toggle */}
      <div className="border-t border-neutral-100 p-3 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <AvatarInitials name="Jane Doe" size="sm" />
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-neutral-700 truncate">Jane Doe</span>
              <span className="text-xs text-neutral-400 truncate">Ops Manager</span>
            </div>
          )}
        </div>

        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200/50 transition-colors",
            collapsed && "mx-auto mt-2 w-full flex justify-center"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

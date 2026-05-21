"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import { Bell, Grid } from "lucide-react"
import { SearchInput, BreadcrumbNav, NotificationBadge, AvatarMenu } from "@/components/ui/kit"

export function Topbar() {
  const pathname = usePathname()

  // Generate basic breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean).map((segment, index, array) => {
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: index === array.length - 1 ? undefined : `/${array.slice(0, index + 1).join('/')}`
    }
  })

  // Ensure at least Dashboard is shown
  if (segments.length === 0) {
    segments.push({ label: 'Dashboard', href: undefined })
  }

  return (
    <header className="h-[64px] bg-white border-b border-neutral-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <BreadcrumbNav segments={segments} className="hidden md:flex" />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <SearchInput placeholder="Search shipments, vendors..." />
        </div>

        <div className="flex items-center gap-2 border-l border-neutral-100 pl-4 ml-2">
          <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors">
            <NotificationBadge count={3}>
              <Bell className="w-5 h-5" />
            </NotificationBadge>
          </button>

          <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-md transition-colors hidden sm:block">
            <Grid className="w-5 h-5" />
          </button>
        </div>

        <div className="ml-2">
          <AvatarMenu user={{ name: "Jane Doe", email: "jane@logisaas.com", role: "Admin" }} />
        </div>
      </div>
    </header>
  )
}

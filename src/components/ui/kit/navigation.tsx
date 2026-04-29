import * as React from "react"
import Link from "next/link"
import { ChevronRight, LogOut, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { AvatarInitials } from "./avatar-initials"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
  collapsed?: boolean
  badge?: number
}

export function SidebarItem({ icon: Icon, label, href, active, collapsed, badge }: SidebarItemProps) {
  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-fast group relative",
        active
          ? "bg-primary-50 text-primary-700 font-semibold"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1 bottom-1 w-1 bg-primary-500 rounded-r-md" />
      )}
      <Icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-primary-500" : "text-neutral-500 group-hover:text-neutral-700")} />

      {!collapsed && (
        <>
          <span className="flex-1 text-sm">{label}</span>
          {badge !== undefined && badge > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-bold text-white">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <Tooltip >
        <TooltipTrigger render={content} />
        <TooltipContent side="right" className="bg-neutral-800 text-white border-none font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}

interface SidebarGroupProps {
  label?: string
  items: React.ReactNode
  collapsed?: boolean
}

export function SidebarGroup({ label, items, collapsed }: SidebarGroupProps) {
  return (
    <div className="mb-6 flex flex-col gap-1">
      {label && !collapsed && (
        <h4 className="px-4 mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </h4>
      )}
      {items}
    </div>
  )
}

interface BreadcrumbNavProps {
  segments: { label: string; href?: string }[]
  className?: string
}

export function BreadcrumbNav({ segments, className }: BreadcrumbNavProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast || !segment.href ? (
                  <BreadcrumbPage className="font-semibold text-neutral-700 text-sm">
                    {segment.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={segment.href} className="text-neutral-500 hover:text-neutral-800 text-sm font-medium">
                    {segment.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-neutral-300" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

interface AvatarMenuProps {
  user: {
    name: string
    email: string
    role?: string
  }
}

export function AvatarMenu({ user }: AvatarMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <AvatarInitials name={user.name} size="sm" />
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-semibold text-neutral-700 leading-none">{user.name}</span>
            {user.role && <span className="text-xs text-neutral-400 mt-0.5">{user.role}</span>}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border-neutral-100 shadow-md rounded-lg">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-neutral-800">{user.name}</p>
            <p className="text-xs leading-none text-neutral-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-100" />
        <DropdownMenuItem className="cursor-pointer text-neutral-600 focus:bg-neutral-50 focus:text-neutral-800">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-neutral-600 focus:bg-neutral-50 focus:text-neutral-800">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-100" />
        <DropdownMenuItem className="cursor-pointer text-danger-500 focus:bg-danger-50 focus:text-danger-700">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

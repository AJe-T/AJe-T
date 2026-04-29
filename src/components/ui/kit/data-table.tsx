"use client"
import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LoadingSkeleton } from "./loading-skeleton"
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export interface ColumnDef<T> {
  key: keyof T | string
  header: React.ReactNode
  cell?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  loading?: boolean
  emptyState?: React.ReactNode
  pagination?: boolean
  onRowClick?: (item: T) => void
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyState,
  pagination = false,
  onRowClick,
  className,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className={className}>
        <Table>
          <TableHeader className="bg-neutral-25">
            <TableRow className="hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead key={i} className={cn("text-xs uppercase tracking-wide text-neutral-400 font-medium h-10", col.className)}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={columns.length} className="p-0">
                  <LoadingSkeleton variant="table-row" className="px-4 border-b-0" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (data.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader className="bg-neutral-25">
            <TableRow className="hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead key={i} className={cn("text-xs uppercase tracking-wide text-neutral-400 font-medium h-10", col.className)}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "h-[52px] transition-fast",
                  onRowClick ? "cursor-pointer hover:bg-primary-50" : "hover:bg-primary-50"
                )}
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className={cn("py-2", col.className)}>
                    {col.cell ? col.cell(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && data.length > 0 && (
        <div className="py-4 border-t border-neutral-100 flex justify-end">
          <Pagination className="justify-end w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="text-sm font-medium text-neutral-600 hover:text-primary-700 hover:bg-primary-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="bg-primary-500 text-white hover:bg-primary-600 hover:text-white">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="text-sm font-medium text-neutral-600 hover:text-primary-700 hover:bg-primary-50">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="text-sm font-medium text-neutral-600 hover:text-primary-700 hover:bg-primary-50">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="text-sm font-medium text-neutral-600 hover:text-primary-700 hover:bg-primary-50" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

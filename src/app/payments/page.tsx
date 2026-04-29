"use client"
import * as React from "react"
import { AlertTriangle, CheckCircle, Clock, Download, XCircle } from "lucide-react"
import { paymentsData } from "@/lib/mock-data"
import {
  AvatarInitials,
  Card,
  CardHeader,
  DataTable,
  DateRangePicker,
  FilterSelect,
  Grid,
  PageHeader,
  Section,
  StatCard,
  StatusBadge
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"

export default function PaymentsPage() {
  const columns = [
    {
      key: "id",
      header: "Invoice #",
      cell: (row: any) => <span className="font-mono text-sm text-neutral-700 font-medium">{row.id}</span>
    },
    {
      key: "vendor",
      header: "Vendor",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <AvatarInitials name={row.vendor} size="sm" />
          <span className="font-medium text-neutral-800">{row.vendor}</span>
        </div>
      )
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row: any) => <span className="font-semibold text-neutral-800">${row.amount.toLocaleString()}</span>
    },
    {
      key: "dueDate",
      header: "Due Date",
      cell: (row: any) => (
        <span className={row.status === 'overdue' ? 'text-danger-500 font-medium text-sm' : 'text-neutral-500 text-sm'}>
          {row.dueDate}
        </span>
      )
    },
    {
      key: "status",
      header: "Status",
      cell: (row: any) => <StatusBadge status={row.status} />
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      cell: () => (
        <Button variant="ghost" size="icon" className="w-8 h-8 text-neutral-400 hover:text-primary-600 hover:bg-primary-50">
          <Download className="w-4 h-4" />
        </Button>
      )
    }
  ]

  return (
    <Section gap="lg">
      <PageHeader
        title="Payments Hub"
        subtitle="Manage vendor payouts and invoice statuses."
        actions={
          <>
            <FilterSelect label="Vendor" options={[{label: "FastExpress", value: "fast"}]} />
            <DateRangePicker />
          </>
        }
      />

      <Grid cols={4} gap="md">
        <StatCard
          title="Total Paid"
          value={`$${(paymentsData.stats.totalPaid / 1000000).toFixed(2)}M`}
          icon={CheckCircle}
          iconBg="green"
          trend="up"
          trendValue="+12.5%"
          trendLabel="from last month"
        />
        <StatCard
          title="Pending"
          value={`$${(paymentsData.stats.pending / 1000).toFixed(0)}K`}
          icon={Clock}
          iconBg="amber"
          trend="neutral"
          trendValue="24"
          trendLabel="invoices awaiting"
        />
        <StatCard
          title="Overdue"
          value={`$${(paymentsData.stats.overdue / 1000).toFixed(1)}K`}
          icon={AlertTriangle}
          iconBg="red"
          trend="down"
          trendValue="7"
          trendLabel="Action required"
        />
        <StatCard
          title="Failed"
          value={`$${(paymentsData.stats.failed / 1000).toFixed(1)}K`}
          icon={XCircle}
          iconBg="red"
          trend="down"
          trendValue="2"
          trendLabel="bank transfer errors"
        />
      </Grid>

      <Card padding="none" className="overflow-hidden">
        <CardHeader
          title="Recent Invoices"
          className="p-5 border-b border-neutral-100 mb-0"
          action={<Button variant="ghost" className="text-neutral-500 hover:text-neutral-800">View All →</Button>}
        />
        <DataTable
          columns={columns}
          data={paymentsData.invoices.slice(0, 8)}
          pagination={true}
        />
      </Card>
    </Section>
  )
}

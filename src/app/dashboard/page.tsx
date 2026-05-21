"use client"
import * as React from "react"
import { ArrowRight, CheckCircle, Clock, DollarSign, MoreHorizontal, Truck } from "lucide-react"
import { dashboardData } from "@/lib/mock-data"
import {
  AreaChartCard,
  AvatarInitials,
  Card,
  CardHeader,
  DataTable,
  DateRangePicker,
  DonutChartCard,
  Grid,
  LoadingSkeleton,
  PageHeader,
  Section,
  StatCard,
  StatusBadge,
  TrackingId
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import { chartColors } from "@/lib/design-tokens"

export default function DashboardPage() {
  const columns = [
    {
      key: "id",
      header: "Tracking ID",
      cell: (row: any) => <TrackingId value={row.id} />
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
      key: "route",
      header: "Route",
      cell: (row: any) => {
        const [origin, dest] = row.route.split(' → ')
        return (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span>{origin}</span>
            <ArrowRight className="w-3 h-3 text-neutral-400" />
            <span>{dest}</span>
          </div>
        )
      }
    },
    {
      key: "status",
      header: "Status",
      cell: (row: any) => <StatusBadge status={row.status} />
    },
    {
      key: "date",
      header: "Date",
      cell: (row: any) => <span className="text-sm text-neutral-500">{row.date}</span>
    },
    {
      key: "amount",
      header: "Amount",
      className: "text-right",
      cell: (row: any) => <span className="text-sm font-semibold text-neutral-700">${row.amount.toLocaleString()}</span>
    },
  ]

  return (
    <Section gap="lg">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Here's what's happening with your operations today."
        actions={<DateRangePicker />}
      />

      <Grid cols={4} gap="md">
        <StatCard
          title="Total Active Shipments"
          value={dashboardData.stats.activeShipments.toLocaleString()}
          icon={Truck}
          iconBg="purple"
          trend="up"
          trendValue="12.5%"
          trendLabel="vs last month"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(dashboardData.stats.monthlyRevenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          iconBg="green"
          trend="up"
          trendValue="8.2%"
          trendLabel="vs last month"
        />
        <StatCard
          title="Pending Bookings"
          value={dashboardData.stats.pendingBookings}
          icon={Clock}
          iconBg="amber"
          trend="down"
          trendValue="2.1%"
          trendLabel="needs attention"
        />
        <StatCard
          title="Delivery Success Rate"
          value={`${dashboardData.stats.deliverySuccessRate}%`}
          icon={CheckCircle}
          iconBg="blue"
          trend="neutral"
          trendValue="0.0%"
          trendLabel="consistent target"
        />
      </Grid>

      <Grid cols={3} gap="md">
        <div className="lg:col-span-2">
          <AreaChartCard
            title="Shipment Volume"
            subtitle="Daily shipments over selected period"
            data={dashboardData.shipmentVolume}
            dataKey="shipments"
            xKey="date"
            color="var(--color-primary-500)"
            height={300}
          />
        </div>
        <div className="lg:col-span-1">
          <DonutChartCard
            title="Status Distribution"
            data={dashboardData.statusDistribution}
            nameKey="name"
            valueKey="value"
            colors={[
              'var(--color-primary-500)',
              'var(--color-success-500)',
              'var(--color-warning-500)',
              'var(--color-neutral-300)'
            ]}
            centerLabel="Total"
            centerValue="1.2k"
            height={300}
          />
        </div>
      </Grid>

      <Grid cols={1}>
        <Card padding="none" className="overflow-hidden">
          <CardHeader
            title="Recent Activity"
            className="p-5 border-b border-neutral-100 mb-0"
            action={<Button variant="ghost" className="text-neutral-500 hover:text-neutral-800">View All →</Button>}
          />
          <DataTable
            columns={columns}
            data={dashboardData.recentActivity}
            pagination={true}
          />
          <div className="p-4 border-t border-neutral-100 bg-neutral-25/50 space-y-4">
            <LoadingSkeleton variant="table-row" className="opacity-50" />
            <LoadingSkeleton variant="table-row" className="opacity-25" />
          </div>
        </Card>
      </Grid>
    </Section>
  )
}

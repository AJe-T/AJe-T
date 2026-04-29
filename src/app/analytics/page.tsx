"use client"
import * as React from "react"
import { Building2, DollarSign, Download, FileText, PackageCheck, Target, Timer } from "lucide-react"
import { analyticsData } from "@/lib/mock-data"
import {
  AvatarInitials,
  Card,
  CardHeader,
  ComposedChartCard,
  DataTable,
  DateRangePicker,
  DonutChartCard,
  Grid,
  HorizontalBarChartCard,
  LineChartCard,
  PageHeader,
  ProgressBar,
  RadarChartCard,
  Section,
  Sparkline,
  StatCard,
  StatusBadge
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  const vendorColumns = [
    {
      key: "vendor",
      header: "Vendor",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <AvatarInitials name={row.name} size="sm" />
          <span className="font-medium text-neutral-800">{row.name}</span>
        </div>
      )
    },
    {
      key: "shipments",
      header: "Shipments",
      cell: (row: any) => <span className="font-semibold text-neutral-700">{row.shipments}</span>
    },
    {
      key: "revenue",
      header: "Revenue",
      cell: (row: any) => <span className="font-semibold text-neutral-800">${row.revenue.toLocaleString()}</span>
    },
    {
      key: "onTime",
      header: "On-Time %",
      cell: (row: any) => (
        <div className="w-[120px]">
          <ProgressBar
            value={row.onTime}
            color={row.onTime >= 95 ? "green" : row.onTime >= 85 ? "amber" : "red"}
            label={undefined}
          />
          <span className="text-[10px] text-neutral-500 mt-1 block text-right">{row.onTime}%</span>
        </div>
      )
    },
    {
      key: "avgValue",
      header: "Avg Value",
      cell: (row: any) => <span className="text-sm text-neutral-600">${row.avgValue}</span>
    },
    {
      key: "trend",
      header: "Trend",
      cell: (row: any) => (
        <Sparkline
          data={row.trend}
          color={row.trend[row.trend.length - 1] > row.trend[0] ? "var(--color-success-500)" : "var(--color-danger-500)"}
        />
      )
    },
    {
      key: "status",
      header: "Status",
      cell: (row: any) => <StatusBadge status={row.status} />
    }
  ]

  return (
    <Section gap="lg">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive overview of logistics performance."
        actions={
          <>
            <DateRangePicker />
            <Button variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200">
              <Download className="w-4 h-4 mr-2" /> CSV
            </Button>
            <Button variant="default" className="bg-primary-500 hover:bg-primary-600 text-white">
              <FileText className="w-4 h-4 mr-2" /> PDF
            </Button>
          </>
        }
      />

      <Grid cols={5} gap="md">
        <StatCard
          title="Total Revenue" value={`$${(analyticsData.kpis.revenue / 1000).toFixed(1)}k`}
          icon={DollarSign} iconBg="green" trend="up" trendValue="12.5%"
        />
        <StatCard
          title="Total Bookings" value={analyticsData.kpis.bookings.toLocaleString()}
          icon={PackageCheck} iconBg="purple" trend="up" trendValue="5.2%"
        />
        <StatCard
          title="Active Vendors" value={analyticsData.kpis.vendors}
          icon={Building2} iconBg="blue" trend="neutral" trendValue="0"
        />
        <StatCard
          title="Avg Delivery Time" value={`${analyticsData.kpis.avgDeliveryTime} days`}
          icon={Timer} iconBg="amber" trend="down" trendValue="0.3" trendLabel="(good)"
        />
        <StatCard
          title="On-Time Rate" value={`${analyticsData.kpis.onTimeRate}%`}
          icon={Target} iconBg="green" trend="up" trendValue="1.2%"
        />
      </Grid>

      <Grid cols={2} gap="md">
        <ComposedChartCard
          title="Revenue & Bookings Trend"
          subtitle="Daily revenue vs booking count"
          data={analyticsData.revenueTrend}
          areas={[{ key: "revenue", color: "var(--color-primary-500)" }]}
          bars={[{ key: "bookings", color: "var(--color-accent-500)" }]}
          dualAxis={true}
          height={320}
        />
        <DonutChartCard
          title="Shipment Status Breakdown"
          subtitle="Current distribution across all shipments"
          data={analyticsData.statusBreakdown}
          nameKey="name"
          valueKey="value"
          colors={[
            'var(--color-primary-500)',
            'var(--color-success-500)',
            'var(--color-warning-500)',
            'var(--color-accent-500)',
            'var(--color-neutral-300)'
          ]}
          centerLabel="Shipments"
          centerValue="1,200"
          height={320}
        />
      </Grid>

      <Grid cols={3} gap="md">
        <HorizontalBarChartCard
          title="Top Routes by Volume"
          subtitle="Bookings per active route"
          data={analyticsData.topRoutes}
          nameKey="route"
          valueKey="count"
          color="var(--color-primary-500)"
          height={280}
        />
        <RadarChartCard
          title="Vendor Performance"
          subtitle="Top 3 vendors across key metrics"
          data={analyticsData.vendorPerformance}
          metrics={["On-Time%", "Volume", "Revenue", "Satisfaction", "Speed"]}
          series={[
            { name: "FastExpress", color: "var(--color-primary-500)" },
            { name: "GlobalTransit", color: "var(--color-success-500)" },
            { name: "CityDash", color: "var(--color-accent-500)" }
          ]}
          height={280}
        />
        <LineChartCard
          title="Daily Delivery Success"
          subtitle="Actual vs SLA target (95%)"
          data={analyticsData.dailySuccess}
          lines={[
            { key: "actual", name: "Actual %", color: "var(--color-success-500)" },
            { key: "target", name: "Target %", color: "var(--color-neutral-300)", dashed: true }
          ]}
          referenceLines={[
            { y: 95, label: "SLA Target", color: "var(--color-danger-500)" }
          ]}
          height={280}
        />
      </Grid>

      <Grid cols={1}>
        <Card padding="none" className="overflow-hidden">
          <CardHeader
            title="Top Vendor Performance"
            subtitle="Ranked by revenue this period"
            className="p-5 border-b border-neutral-100 mb-0"
            action={<Button variant="ghost" className="text-neutral-500 hover:text-neutral-800">View All Vendors →</Button>}
          />
          <DataTable
            columns={vendorColumns}
            data={analyticsData.vendors}
            pagination={false}
          />
        </Card>
      </Grid>
    </Section>
  )
}

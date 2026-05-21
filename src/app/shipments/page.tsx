"use client"
import * as React from "react"
import { ArrowRight, CheckCircle, Download, Eye, MapPin, Navigation, SlidersHorizontal, Truck } from "lucide-react"
import { shipmentsData } from "@/lib/mock-data"
import {
  AvatarInitials,
  Card,
  DataTable,
  DateRangePicker,
  DrawerSheet,
  FilterSelect,
  Grid,
  PageHeader,
  SearchInput,
  Section,
  StatCard,
  StatusBadge,
  StepTimeline,
  TrackingId
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ShipmentsPage() {
  const [selectedShipment, setSelectedShipment] = React.useState<any | null>(null)

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
      key: "eta",
      header: "ETA",
      cell: (row: any) => (
        <span className={cn("text-sm", row.status === 'overdue' ? "text-danger-500 font-semibold" : "text-neutral-500")}>
          {row.eta}
        </span>
      )
    },
    {
      key: "weight",
      header: "Weight",
      cell: (row: any) => <span className="text-sm text-neutral-500">{row.weight}</span>
    },
    {
      key: "amount",
      header: "Amount",
      className: "text-right",
      cell: (row: any) => <span className="text-sm font-semibold text-neutral-700">${row.amount.toLocaleString()}</span>
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      cell: (row: any) => (
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-neutral-400 hover:text-primary-600 hover:bg-primary-50"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedShipment(row)
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
      )
    }
  ]

  const timelineSteps = [
    { label: "Booking Confirmed", time: "Oct 24, 08:30 AM", location: "Order placed", status: "completed" as const },
    { label: "Picked Up", time: "Oct 24, 02:15 PM", location: "Origin Facility", status: "completed" as const },
    { label: "In Transit", time: "Oct 25, 09:45 AM", location: "En route to destination", status: "active" as const, variant: "in_transit" as const },
    { label: "Out for Delivery", status: "upcoming" as const },
    { label: "Delivered", status: "upcoming" as const },
  ]

  return (
    <Section gap="lg">
      <PageHeader
        title="Shipments"
        subtitle="Track and manage all active shipments."
        actions={
          <Button variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        }
      />

      <Grid cols={3} gap="md">
        <StatCard title="Active Shipments" value={shipmentsData.stats.active.toLocaleString()} icon={Truck} iconBg="purple" />
        <StatCard title="In Transit" value={shipmentsData.stats.inTransit.toLocaleString()} icon={Navigation} iconBg="blue" />
        <StatCard title="Delivered (Month)" value={shipmentsData.stats.delivered.toLocaleString()} icon={CheckCircle} iconBg="green" />
      </Grid>

      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 p-4 border-b border-neutral-100 bg-white">
          <SearchInput placeholder="Search tracking ID, vendor..." className="flex-1 min-w-[200px]" />
          <FilterSelect
            label="Status"
            options={[
              {label: "In Transit", value: "in_transit"},
              {label: "Delivered", value: "delivered"},
              {label: "Pending", value: "pending"}
            ]}
            multi
          />
          <FilterSelect
            label="Route"
            options={[
              {label: "NY → LA", value: "NY-LA"},
              {label: "CHI → MIA", value: "CHI-MIA"}
            ]}
          />
          <DateRangePicker />
          <Button variant="ghost" className="text-neutral-500 hover:text-neutral-800 ml-auto">
            <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={shipmentsData.list.slice(0, 12)}
          pagination={true}
          onRowClick={(row) => setSelectedShipment(row)}
        />
      </Card>

      <DrawerSheet
        open={!!selectedShipment}
        onClose={() => setSelectedShipment(null)}
        width="lg"
        title={
          <div className="flex items-center gap-3">
            <span className="font-mono text-primary-500">{selectedShipment?.id}</span>
            <StatusBadge status={selectedShipment?.status || 'pending'} />
          </div>
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelectedShipment(null)} className="text-neutral-500 hover:text-neutral-800">Close</Button>
            <Button variant="default" className="bg-primary-500 hover:bg-primary-600 text-white">Create Similar Booking</Button>
          </>
        }
      >
        <Grid cols={2} gap="md" className="h-full">
          <div className="flex flex-col gap-6">
            <Card className="flex-1">
              <h4 className="text-md font-semibold text-neutral-700 mb-6">Tracking Timeline</h4>
              <StepTimeline steps={timelineSteps} />
            </Card>

            <div className="bg-neutral-100 h-[200px] rounded-lg flex flex-col items-center justify-center text-neutral-400">
              <MapPin className="w-12 h-12 mb-2 opacity-50" />
              <span className="text-sm font-medium">Live tracking coming soon</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Card>
              <h4 className="text-md font-semibold text-neutral-700 mb-4">Package Details</h4>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Type</span>
                  <span className="text-sm font-semibold text-neutral-800">Standard Pallet</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Weight</span>
                  <span className="text-sm font-semibold text-neutral-800">{selectedShipment?.weight}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Dimensions</span>
                  <span className="text-sm font-semibold text-neutral-800">48" × 40" × 60"</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-1">Special Instructions</span>
                  <span className="text-sm font-semibold text-neutral-800">Handle with care. Keep dry.</span>
                </div>
              </div>
            </Card>

            <Card>
              <h4 className="text-md font-semibold text-neutral-700 mb-4">Vendor Info</h4>
              <div className="flex items-center gap-4 mb-4">
                <AvatarInitials name={selectedShipment?.vendor || 'Vendor'} size="lg" />
                <div>
                  <h5 className="font-semibold text-neutral-800">{selectedShipment?.vendor}</h5>
                  <p className="text-sm text-neutral-500">contact@{selectedShipment?.vendor.toLowerCase()}.com</p>
                  <p className="text-xs text-neutral-400 mt-1">{selectedShipment?.route}</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200">
                View Vendor →
              </Button>
            </Card>
          </div>
        </Grid>
      </DrawerSheet>
    </Section>
  )
}

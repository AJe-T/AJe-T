"use client"
import * as React from "react"
import { Activity, Building2, FileText, PackagePlus, Plus, UserPlus } from "lucide-react"
import { analyticsData } from "@/lib/mock-data"
import {
  AreaChartCard,
  AvatarInitials,
  Card,
  DataTable,
  DrawerSheet,
  FilterSelect,
  Grid,
  Inline,
  PageHeader,
  SearchInput,
  Section,
  Sparkline,
  Stack,
  StatCard,
  StatusBadge
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = React.useState<any | null>(null)

  return (
    <Section gap="lg">
      <PageHeader
        title="Vendors & Customers"
        subtitle="Manage your B2B vendor relationships."
        actions={
          <Button variant="default" className="bg-primary-500 hover:bg-primary-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Vendor
          </Button>
        }
      />

      <Grid cols={3} gap="md">
        <StatCard title="Total Vendors" value={84} icon={Building2} iconBg="purple" />
        <StatCard title="Active This Month" value={61} icon={Activity} iconBg="green" />
        <StatCard title="New This Quarter" value={12} icon={UserPlus} iconBg="blue" />
      </Grid>

      <div className="flex flex-wrap items-center gap-4">
        <SearchInput placeholder="Search vendors..." className="flex-1 min-w-[200px]" />
        <FilterSelect label="Industry" options={[{label: "Express Freight", value: "1"}, {label: "Cold Chain", value: "2"}]} />
        <FilterSelect label="Status" options={[{label: "Active", value: "active"}, {label: "Inactive", value: "inactive"}]} />
        <FilterSelect label="Sort" options={[{label: "Revenue (High to Low)", value: "rev_desc"}, {label: "Name (A-Z)", value: "name_asc"}]} />
      </div>

      <Grid cols={3} gap="md">
        {analyticsData.vendors.map((vendor, index) => (
          <Card key={index} hover={true} className="flex flex-col h-full">
            <Inline gap="md" align="center" className="mb-4">
              <AvatarInitials name={vendor.name} size="lg" />
              <Stack gap="xs" className="flex-1">
                <span className="text-md font-semibold text-neutral-800">{vendor.name}</span>
                <div>
                  <StatusBadge status={vendor.status} className="!py-0.5 !px-2 scale-90 origin-left" />
                </div>
              </Stack>
            </Inline>

            <div className="mb-6">
              <span className="inline-flex items-center px-2 py-1 rounded-sm bg-neutral-100 text-neutral-600 text-xs font-medium">
                {['Express Freight', 'Cold Chain', 'Last Mile'][index % 3]}
              </span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-neutral-100 mb-6 flex-1">
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-xs text-neutral-400 font-medium mb-1">Shipments</span>
                <span className="font-semibold text-neutral-800">{vendor.shipments}</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-xs text-neutral-400 font-medium mb-1">Revenue</span>
                <span className="font-semibold text-neutral-800">${(vendor.revenue / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="text-xs text-neutral-400 font-medium mb-1">On-Time</span>
                <span className="font-semibold text-neutral-800">{vendor.onTime}%</span>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200"
              onClick={() => setSelectedVendor(vendor)}
            >
              View Profile →
            </Button>
          </Card>
        ))}
      </Grid>

      <DrawerSheet
        open={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
        width="xl"
        title={
          <div className="flex items-center gap-4">
            <AvatarInitials name={selectedVendor?.name || "Vendor"} size="lg" />
            <div className="flex flex-col">
              <span>{selectedVendor?.name}</span>
              <StatusBadge status={selectedVendor?.status || "active"} className="mt-1 self-start scale-90 origin-left" />
            </div>
          </div>
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelectedVendor(null)} className="text-neutral-500 hover:text-neutral-800">Close</Button>
            <Button variant="secondary" className="bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200">
              <PackagePlus className="w-4 h-4 mr-2" /> New Booking
            </Button>
            <Button variant="default" className="bg-primary-500 hover:bg-primary-600 text-white">
              <FileText className="w-4 h-4 mr-2" /> Send Invoice
            </Button>
          </>
        }
      >
        <Grid cols={2} gap="md">
          <div className="flex flex-col gap-6">
            <Card>
              <h4 className="text-md font-semibold text-neutral-800 mb-4 border-b border-neutral-100 pb-2">Company Info</h4>
              <dl className="space-y-3 text-sm">
                <div className="grid grid-cols-3">
                  <dt className="text-neutral-500 font-medium">Industry</dt>
                  <dd className="col-span-2 text-neutral-800 font-semibold">Express Freight</dd>
                </div>
                <div className="grid grid-cols-3">
                  <dt className="text-neutral-500 font-medium">Contact</dt>
                  <dd className="col-span-2 text-neutral-800 font-semibold">Jane Doe (+1 555-0198)</dd>
                </div>
                <div className="grid grid-cols-3">
                  <dt className="text-neutral-500 font-medium">Email</dt>
                  <dd className="col-span-2 text-primary-600 font-semibold">contact@{selectedVendor?.name?.toLowerCase() || 'vendor'}.com</dd>
                </div>
              </dl>
            </Card>

            <Card>
              <h4 className="text-md font-semibold text-neutral-800 mb-4 border-b border-neutral-100 pb-2">Performance Stats</h4>
              <Grid cols={2} gap="sm">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Shipments</span>
                  <div className="text-xl font-bold text-neutral-800 mt-1">{selectedVendor?.shipments}</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Revenue</span>
                  <div className="text-xl font-bold text-neutral-800 mt-1">${(selectedVendor?.revenue || 0).toLocaleString()}</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">On-Time %</span>
                  <div className="text-xl font-bold text-neutral-800 mt-1">{selectedVendor?.onTime}%</div>
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <span className="text-xs text-neutral-500 font-medium">Avg Value</span>
                  <div className="text-xl font-bold text-neutral-800 mt-1">${selectedVendor?.avgValue}</div>
                </div>
              </Grid>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <AreaChartCard
              title="Shipment History"
              subtitle="Volume over last 30 days"
              data={Array.from({length: 30}, (_, i) => ({ day: i+1, vol: 10 + Math.random()*20 }))}
              dataKey="vol"
              xKey="day"
              height={200}
            />
          </div>
        </Grid>
      </DrawerSheet>
    </Section>
  )
}

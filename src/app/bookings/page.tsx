"use client"
import * as React from "react"
import { ArrowRight, Calendar, Clock, Eye, PackageCheck, Plus } from "lucide-react"
import { bookingsData } from "@/lib/mock-data"
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
  StepIndicator,
  TrackingId
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"

export default function BookingsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)

  const columns = [
    {
      key: "id",
      header: "Booking ID",
      cell: (row: any) => <TrackingId value={row.id} />
    },
    {
      key: "date",
      header: "Date",
      cell: (row: any) => <span className="text-sm text-neutral-500">{row.date}</span>
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
      key: "amount",
      header: "Amount",
      className: "text-right",
      cell: (row: any) => <span className="text-sm font-semibold text-neutral-700">${row.amount.toLocaleString()}</span>
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      cell: () => (
        <Button variant="ghost" size="icon" className="w-8 h-8 text-neutral-400 hover:text-primary-600 hover:bg-primary-50">
          <Eye className="w-4 h-4" />
        </Button>
      )
    }
  ]

  return (
    <Section gap="lg">
      <PageHeader
        title="Bookings"
        subtitle="Manage and create shipment bookings for all vendors."
        actions={
          <Button
            variant="default"
            className="bg-primary-500 hover:bg-primary-600 text-white"
            onClick={() => {
              setCurrentStep(0)
              setIsDrawerOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> New Booking
          </Button>
        }
      />

      <Grid cols={3} gap="md">
        <StatCard title="Total Bookings" value={bookingsData.stats.total.toLocaleString()} icon={PackageCheck} iconBg="purple" />
        <StatCard title="Pending" value={bookingsData.stats.pending} icon={Clock} iconBg="amber" />
        <StatCard title="This Month" value={bookingsData.stats.thisMonth} icon={Calendar} iconBg="green" />
      </Grid>

      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 p-4 border-b border-neutral-100 bg-white">
          <SearchInput placeholder="Search booking ID, vendor..." className="flex-1 min-w-[200px]" />
          <FilterSelect
            label="Status"
            options={[
              {label: "Pending", value: "pending"},
              {label: "Confirmed", value: "confirmed"},
              {label: "Cancelled", value: "cancelled"}
            ]}
          />
          <FilterSelect
            label="Vendor"
            options={[
              {label: "FastExpress", value: "fast"},
              {label: "GlobalTransit", value: "global"}
            ]}
          />
          <DateRangePicker />
        </div>

        <DataTable
          columns={columns}
          data={bookingsData.list.slice(0, 10)}
          pagination={true}
        />
      </Card>

      <DrawerSheet
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width="lg"
        title="New Booking"
        subtitle="Complete the details below to schedule."
        footer={
          <>
            {currentStep > 0 && (
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="text-neutral-500 hover:text-neutral-800"
              >
                Back
              </Button>
            )}
            {currentStep < 2 ? (
              <Button
                variant="default"
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={() => setCurrentStep(prev => prev + 1)}
              >
                Continue →
              </Button>
            ) : (
              <Button
                variant="default"
                className="bg-primary-500 hover:bg-primary-600 text-white"
                onClick={() => setIsDrawerOpen(false)}
              >
                Confirm Booking →
              </Button>
            )}
          </>
        }
      >
        <div className="mb-8 mt-4">
          <StepIndicator
            steps={["Pickup/Delivery", "Package Info", "Confirm"]}
            currentStep={currentStep}
          />
        </div>

        <div className="mt-8">
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-neutral-800">Location Details</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Pickup Address</label>
                  <textarea
                    className="w-full p-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm placeholder:text-neutral-300 resize-none h-24"
                    placeholder="Street, City, State, ZIP"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Delivery Address</label>
                  <textarea
                    className="w-full p-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm placeholder:text-neutral-300 resize-none h-24"
                    placeholder="Street, City, State, ZIP"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Pickup Date</label>
                  <div className="border border-neutral-200 rounded-md h-10 px-3 flex items-center bg-white text-neutral-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" /> Select Date
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Delivery Type</label>
                  <select className="w-full h-10 px-3 border border-neutral-200 rounded-md bg-white text-sm outline-none focus:border-primary-400">
                    <option>Express</option>
                    <option>Standard</option>
                    <option>Freight</option>
                    <option>Local</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-neutral-800">Package Specification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Package Type</label>
                    <select className="w-full h-10 px-3 border border-neutral-200 rounded-md bg-white text-sm outline-none focus:border-primary-400">
                      <option>Standard Pallet</option>
                      <option>Box</option>
                      <option>Crate</option>
                      <option>Envelope</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Weight (lbs)</label>
                    <input
                      type="number"
                      className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm placeholder:text-neutral-300"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Dimensions (L × W × H in)</label>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="number" className="h-10 px-3 border border-neutral-200 rounded-md text-sm outline-none focus:border-primary-400" placeholder="Length" />
                    <input type="number" className="h-10 px-3 border border-neutral-200 rounded-md text-sm outline-none focus:border-primary-400" placeholder="Width" />
                    <input type="number" className="h-10 px-3 border border-neutral-200 rounded-md text-sm outline-none focus:border-primary-400" placeholder="Height" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Special Instructions</label>
                  <textarea
                    className="w-full p-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm placeholder:text-neutral-300 resize-none h-24"
                    placeholder="Any special handling required?"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <Card className="bg-primary-50 border-primary-200 text-center py-8">
                <span className="text-sm font-semibold text-primary-700 uppercase tracking-wider">Estimated Cost</span>
                <div className="text-4xl font-bold text-primary-900 mt-2">Est. $1,250.00</div>
                <p className="text-sm text-primary-600 mt-2">Expected delivery in 2-3 business days</p>
              </Card>

              <Card>
                <h4 className="text-sm font-semibold text-neutral-800 mb-4 border-b border-neutral-100 pb-2">Review Details</h4>
                <dl className="space-y-3 text-sm">
                  <div className="grid grid-cols-3">
                    <dt className="text-neutral-500 font-medium">Route</dt>
                    <dd className="col-span-2 text-neutral-800 font-semibold">New York → Los Angeles</dd>
                  </div>
                  <div className="grid grid-cols-3">
                    <dt className="text-neutral-500 font-medium">Service</dt>
                    <dd className="col-span-2 text-neutral-800 font-semibold">Express Freight</dd>
                  </div>
                  <div className="grid grid-cols-3">
                    <dt className="text-neutral-500 font-medium">Package</dt>
                    <dd className="col-span-2 text-neutral-800 font-semibold">Standard Pallet (450 lbs)</dd>
                  </div>
                </dl>
              </Card>
            </div>
          )}
        </div>
      </DrawerSheet>
    </Section>
  )
}

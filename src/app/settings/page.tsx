"use client"
import * as React from "react"
import { ShieldCheck, Upload } from "lucide-react"
import {
  AvatarInitials,
  Card,
  PageHeader,
  ProgressBar,
  Section,
  ToggleSwitch
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <Section gap="lg">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and company preferences."
      />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-neutral-100 p-1 mb-8 w-full max-w-2xl mx-auto md:mx-0 flex">
          <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Profile</TabsTrigger>
          <TabsTrigger value="company" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Company</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
          <TabsTrigger value="billing" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Billing</TabsTrigger>
          <TabsTrigger value="security" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <AvatarInitials name="Jane Doe" size="xl" className="mb-4" />
              <Button variant="ghost" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 mb-2">
                <Upload className="w-4 h-4 mr-2" /> Upload Photo
              </Button>
              <button className="text-danger-500 hover:text-danger-700 text-sm font-medium">Remove</button>
            </div>

            <div className="md:col-span-2 space-y-6 max-w-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Full Name</label>
                  <input type="text" defaultValue="Jane Doe" className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Job Title</label>
                  <input type="text" defaultValue="Operations Manager" className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 outline-none text-sm" />
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-neutral-700">Email Address</label>
                <input type="email" defaultValue="jane@logisaas.com" className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 outline-none text-sm bg-neutral-50 text-neutral-500" readOnly />
                <span className="absolute right-3 top-8 text-xs font-semibold text-success-600 bg-success-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Phone</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Timezone</label>
                  <select className="w-full h-10 px-3 border border-neutral-200 rounded-md bg-white text-sm outline-none focus:border-primary-400">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="default" className="bg-primary-500 hover:bg-primary-600 text-white">Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-6 max-w-3xl">
          <Card>
            <h4 className="text-md font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">Shipment Updates</h4>
            <div className="space-y-2">
              <ToggleSwitch checked label="Email notifications" description="Get notified via email for status changes" />
              <ToggleSwitch checked label="SMS notifications" description="Text alerts for critical delivery updates" />
              <ToggleSwitch checked={false} label="In-app notifications" description="Push notifications in your browser" />
            </div>
          </Card>
          <Card>
            <h4 className="text-md font-semibold text-neutral-800 mb-4 pb-2 border-b border-neutral-100">Billing & Payments</h4>
            <div className="space-y-2">
              <ToggleSwitch checked label="Invoice generated" />
              <ToggleSwitch checked label="Payment due reminder" description="3 days before due date" />
              <ToggleSwitch checked={false} label="Payment received" />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-0 space-y-6 max-w-3xl">
          <Card className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="self-start text-xs font-semibold tracking-wider text-primary-700 bg-primary-100 px-2 py-1 rounded mb-2">PROFESSIONAL</span>
                <span className="text-3xl font-bold text-neutral-800">$149/month</span>
                <span className="text-sm text-neutral-500 mt-1">Billed monthly · Next billing Oct 24, 2023</span>
              </div>
              <Button variant="default" className="bg-primary-500 hover:bg-primary-600 text-white">
                Upgrade Plan →
              </Button>
            </div>

            <div className="space-y-6 pt-6 border-t border-neutral-100">
              <ProgressBar value={62} color="green" label="Shipments Used: 1,245 / 2,000" />
              <ProgressBar value={42} color="amber" label="Storage: 4.2GB / 10GB" />
            </div>
          </Card>
        </TabsContent>

        {/* Placeholders for others */}
        <TabsContent value="company" className="mt-0">
           <p className="text-neutral-500 p-8 text-center border border-dashed border-neutral-200 rounded-lg">Company settings coming soon...</p>
        </TabsContent>
        <TabsContent value="security" className="mt-0">
           <p className="text-neutral-500 p-8 text-center border border-dashed border-neutral-200 rounded-lg">Security settings coming soon...</p>
        </TabsContent>
      </Tabs>
    </Section>
  )
}

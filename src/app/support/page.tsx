"use client"
import * as React from "react"
import { CheckCircle, Clock, Eye, HelpCircle, Plus } from "lucide-react"
import { supportData } from "@/lib/mock-data"
import {
  Card,
  CardHeader,
  ConfirmDialog,
  DataTable,
  FilterSelect,
  Grid,
  PageHeader,
  Section,
  StatCard
} from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SupportPage() {
  const [isNewTicketOpen, setIsNewTicketOpen] = React.useState(false)

  const columns = [
    {
      key: "id",
      header: "Ticket #",
      cell: (row: any) => <span className="font-mono text-sm text-neutral-600">{row.id}</span>
    },
    {
      key: "subject",
      header: "Subject",
      cell: (row: any) => <span className="text-sm font-semibold text-neutral-800">{row.subject}</span>
    },
    {
      key: "priority",
      header: "Priority",
      cell: (row: any) => {
        const colors: any = { Critical: "bg-danger-100 text-danger-700", High: "bg-accent-100 text-accent-700", Medium: "bg-warning-100 text-warning-700", Low: "bg-neutral-100 text-neutral-600" }
        return <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${colors[row.priority]}`}>{row.priority}</span>
      }
    },
    {
      key: "status",
      header: "Status",
      cell: (row: any) => {
        const colors: any = { Open: "bg-info-100 text-info-700", "In Progress": "bg-warning-100 text-warning-700", Resolved: "bg-success-100 text-success-700", Closed: "bg-neutral-100 text-neutral-600" }
        return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[row.status]}`}>{row.status}</span>
      }
    },
    {
      key: "created",
      header: "Created",
      cell: (row: any) => <span className="text-sm text-neutral-500">{row.created}</span>
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

  const faqs = [
    { q: "How do I create a new shipment booking?", a: "Navigate to the Bookings page and click 'New Booking' in the top right. Follow the 3-step wizard to enter location, package details, and confirm." },
    { q: "How are shipping rates calculated?", a: "Rates are based on the selected route, package weight and dimensions, and the delivery service type (Express vs Standard). Contracted vendor discounts are automatically applied." },
    { q: "Can I cancel or modify a booking?", a: "Bookings can be modified or cancelled up until they reach the 'Picked Up' status. After that, please contact support for intervention." },
    { q: "How do I download my invoices?", a: "Go to the Payments hub. You can click the download icon next to any invoice in the list, or select multiple and use the bulk export tool." },
    { q: "What file formats are supported for reports?", a: "Currently we support exporting analytics and reports in CSV and PDF formats." },
  ]

  return (
    <Section gap="lg">
      <PageHeader
        title="Support Center"
        subtitle="Manage tickets and get help with your account."
        actions={
          <Button
            variant="default"
            className="bg-primary-500 hover:bg-primary-600 text-white"
            onClick={() => setIsNewTicketOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> New Ticket
          </Button>
        }
      />

      <Grid cols={3} gap="md">
        <StatCard title="Open Tickets" value={supportData.stats.open} icon={HelpCircle} iconBg="purple" />
        <StatCard title="In Progress" value={supportData.stats.inProgress} icon={Clock} iconBg="amber" />
        <StatCard title="Resolved (Month)" value={supportData.stats.resolved} icon={CheckCircle} iconBg="green" />
      </Grid>

      <Grid cols={3} gap="md">
        <div className="lg:col-span-2">
          <Card padding="none" className="h-full">
            <CardHeader
              title="Support Tickets"
              className="p-5 border-b border-neutral-100 mb-0"
              action={
                <div className="flex gap-2">
                  <FilterSelect label="Priority" options={[{label: "Critical", value: "c"}, {label: "High", value: "h"}]} />
                </div>
              }
            />
            <DataTable
              columns={columns}
              data={supportData.tickets.slice(0, 8)}
              pagination={true}
            />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <h4 className="text-md font-semibold text-neutral-800 mb-6">Frequently Asked Questions</h4>
            <Accordion className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-neutral-100">
                  <AccordionTrigger className="text-sm font-semibold text-neutral-700 hover:no-underline hover:text-primary-600 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-500 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </Grid>

      <ConfirmDialog
        open={isNewTicketOpen}
        onOpenChange={setIsNewTicketOpen}
        title="Submit New Ticket"
        description="Please provide details about your issue so our support team can assist you."
        confirmLabel="Submit Ticket"
        onConfirm={() => setIsNewTicketOpen(false)}
      />
    </Section>
  )
}

"use client"
import * as React from "react"
import Link from "next/link"
import { Box, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [notificationsAccepted, setNotificationsAccepted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.")
      return
    }
    // Mock signup logic
    setIsSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center text-success-500 mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800">Account Created Successfully!</h1>
          <p className="text-neutral-500 mt-2">Welcome to LogiSaaS. Your account is ready.</p>
        </div>
        <Link href="/dashboard">
          <Button variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl py-8">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-4">
          <Box className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800">Create an Account</h1>
        <p className="text-neutral-500 mt-2">Choose your account type to get started</p>
      </div>

      <Card className="p-8">
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="bg-neutral-100 p-1 mb-8 w-full flex">
            <TabsTrigger value="individual" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Individual</TabsTrigger>
            <TabsTrigger value="business" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Business</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="individual" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Full Name *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Mobile Number *</label>
                  <input type="tel" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Email Address *</label>
                  <input type="email" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Password *</label>
                  <input type="password" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-0 space-y-6">
              <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-4 border-b border-neutral-100 pb-2">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Business Name *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Business Email *</label>
                  <input type="email" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-neutral-700">Registered Address *</label>
                  <textarea required className="w-full p-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all h-20 resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Pincode *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">City *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">State *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Monthly Volume (No. of Packages)</label>
                  <select className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm bg-white">
                    <option>0-100</option>
                    <option>100-500</option>
                    <option>500-1000</option>
                    <option>1000+</option>
                  </select>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-4 border-b border-neutral-100 pb-2 pt-4">Legal & KYC</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">GSTIN</label>
                  <input type="text" className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">PAN</label>
                  <input type="text" className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">KYC Document Type *</label>
                  <select required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm bg-white">
                    <option>Company Registration Certificate</option>
                    <option>Aadhar Card</option>
                    <option>Passport</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Document Image (Front & Back) *</label>
                  <input type="file" multiple required className="w-full h-10 px-3 py-2 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all text-neutral-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                </div>
              </div>

              <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-4 border-b border-neutral-100 pb-2 pt-4">Account Admin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Contact Name *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Contact Email *</label>
                  <input type="email" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Contact Number *</label>
                  <input type="tel" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Full Name *</label>
                  <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Password *</label>
                  <input type="password" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                </div>
              </div>
            </TabsContent>

            <div className="mt-8 space-y-4 pt-6 border-t border-neutral-100">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={notificationsAccepted}
                  onChange={(e) => setNotificationsAccepted(e.target.checked)}
                  className="mt-1 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-600 group-hover:text-neutral-800">
                  Send me notifications via email and SMS regarding my shipments and account updates.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-600 group-hover:text-neutral-800">
                  I accept the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>. *
                </span>
              </label>

              <Button type="submit" variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold mt-4">
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                Log in
              </Link>
            </p>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

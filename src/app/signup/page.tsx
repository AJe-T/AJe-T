"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Box, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignupPage() {
  const router = useRouter()

  // Registration flow state
  const [step, setStep] = React.useState<"contact" | "otp" | "details">("contact")
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Common Contact Info
  const [contactType, setContactType] = React.useState<"email" | "mobile">("email")
  const [contactValue, setContactValue] = React.useState("")
  const [otp, setOtp] = React.useState("")

  // Role and details
  const [role, setRole] = React.useState<"individual" | "business">("individual")
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [notificationsAccepted, setNotificationsAccepted] = React.useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (contactValue.length > 0) {
      setStep("otp")
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length > 0) {
      setStep("details")
    }
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.")
      return
    }
    // Mock signup logic
    setIsSuccess(true)
    document.cookie = "logisaas_auth=true; path=/; max-age=86400"
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="w-full max-w-md text-center animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center text-success-500 mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800">Account Created Successfully!</h1>
          <p className="text-neutral-500 mt-2">Welcome to LogiSaaS. Redirecting to dashboard...</p>
        </div>
        <Link href="/dashboard">
          <Button variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
            Go to Dashboard Now
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
        <p className="text-neutral-500 mt-2">
          {step === "contact" && "Let's start by verifying your contact info"}
          {step === "otp" && "Verify your contact info"}
          {step === "details" && "Complete your account details"}
        </p>
      </div>

      <Card className="p-8">
        {step === "contact" && (
          <div className="max-w-md mx-auto space-y-6">
            <Tabs value={contactType} onValueChange={(v: any) => setContactType(v)} className="w-full">
              <TabsList className="bg-neutral-100 p-1 mb-6 w-full flex">
                <TabsTrigger value="email" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Email</TabsTrigger>
                <TabsTrigger value="mobile" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Mobile</TabsTrigger>
              </TabsList>
            </Tabs>
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  {contactType === "email" ? "Email Address" : "Mobile Number"}
                </label>
                <input
                  type={contactType === "email" ? "email" : "tel"}
                  required
                  className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
                  placeholder={contactType === "email" ? "name@company.com" : "Enter mobile number"}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                />
              </div>
              <Button type="submit" variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
                Send OTP
              </Button>
            </form>
            <div className="mt-8 text-center border-t border-neutral-100 pt-6">
              <p className="text-sm text-neutral-500">
                Already have an account?{" "}
                <Link href="/signin" className="font-semibold text-primary-600 hover:text-primary-700">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}

        {step === "otp" && (
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-700">Enter OTP</label>
                  <button type="button" onClick={() => setStep("contact")} className="text-sm font-medium text-primary-600 hover:text-primary-700">Change Contact</button>
                </div>
                <input
                  type="text"
                  required
                  className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all text-center tracking-widest text-lg font-semibold"
                  placeholder="••••"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p className="text-xs text-neutral-500 mt-2">OTP sent to {contactValue}</p>
              </div>
              <Button type="submit" variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
                Verify & Continue
              </Button>
            </form>
          </div>
        )}

        {step === "details" && (
          <div>
            <Tabs value={role} onValueChange={(v: any) => setRole(v)} className="w-full">
              <TabsList className="bg-neutral-100 p-1 mb-8 w-full flex">
                <TabsTrigger value="individual" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Individual</TabsTrigger>
                <TabsTrigger value="business" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Business</TabsTrigger>
              </TabsList>

              <form onSubmit={handleFinalSubmit}>
                {role === "individual" && (
                  <div className="mt-0 space-y-6 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Full Name *</label>
                        <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Mobile Number *</label>
                        <input type="tel" required defaultValue={contactType === 'mobile' ? contactValue : ''} className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" readOnly={contactType === 'mobile'} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Email Address *</label>
                        <input type="email" required defaultValue={contactType === 'email' ? contactValue : ''} className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" readOnly={contactType === 'email'} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Password *</label>
                        <input type="password" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                      </div>
                    </div>
                  </div>
                )}

                {role === "business" && (
                  <div className="mt-0 space-y-6 animate-in fade-in">
                    <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-4 border-b border-neutral-100 pb-2">Business Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Business Name *</label>
                        <input type="text" required className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700">Business Email *</label>
                        <input type="email" required defaultValue={contactType === 'email' ? contactValue : ''} className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
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
                        <input type="tel" required defaultValue={contactType === 'mobile' ? contactValue : ''} className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all" />
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
                  </div>
                )}

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
            </Tabs>
          </div>
        )}
      </Card>
    </div>
  )
}

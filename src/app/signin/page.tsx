"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Box } from "lucide-react"
import { Card } from "@/components/ui/kit"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SigninPage() {
  const router = useRouter()
  const [mobile, setMobile] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [otpSent, setOtpSent] = React.useState(false)

  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile.length >= 10) {
      setOtpSent(true)
    }
  }

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length > 0) {
      document.cookie = "logisaas_auth=true; path=/; max-age=86400"
      router.push("/dashboard")
    }
  }

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (identifier && password) {
      document.cookie = "logisaas_auth=true; path=/; max-age=86400"
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-4">
          <Box className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800">Welcome to LogiSaaS</h1>
        <p className="text-neutral-500 mt-2">Sign in to your account to continue</p>
      </div>

      <Card className="p-8">
        <Tabs defaultValue="otp" className="w-full">
          <TabsList className="bg-neutral-100 p-1 mb-8 w-full flex">
            <TabsTrigger value="otp" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Mobile OTP</TabsTrigger>
            <TabsTrigger value="credentials" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Credentials</TabsTrigger>
          </TabsList>

          <TabsContent value="otp" className="mt-0">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpLogin} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-700">Enter OTP</label>
                    <button type="button" onClick={() => setOtpSent(false)} className="text-sm font-medium text-primary-600 hover:text-primary-700">Change Number</button>
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
                  <p className="text-xs text-neutral-500 mt-2">OTP sent to {mobile}</p>
                </div>
                <Button type="submit" variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
                  Verify & Sign In
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="credentials" className="mt-0">
            <form onSubmit={handleCredentialsLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Email or Username</label>
                <input
                  type="text"
                  required
                  className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
                  placeholder="name@company.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-700">Password</label>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">Forgot password?</a>
                </div>
                <input
                  type="password"
                  required
                  className="w-full h-10 px-3 border border-neutral-200 rounded-md focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" variant="default" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold">
                Sign In
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

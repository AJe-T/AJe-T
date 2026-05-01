"use client"
import * as React from "react"
import Link from "next/link"
import { Box } from "lucide-react"
import { Card } from "@/components/ui/kit"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login logic
    window.location.href = "/dashboard"
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-4">
          <Box className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800">Welcome to LogiSaaS</h1>
        <p className="text-neutral-500 mt-2">Enter your credentials to continue</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Mobile Number or Email</label>
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

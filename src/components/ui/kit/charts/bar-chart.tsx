"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface BarChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  xKey: string
  yKey: string
  color?: string
  height?: number
  className?: string
}

export function BarChartCard({
  title,
  subtitle,
  data,
  xKey,
  yKey,
  color = "var(--color-primary-500)",
  height = 280,
  className
}: BarChartCardProps) {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-100)" />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-neutral-400)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-neutral-400)', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'var(--color-neutral-50)' }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-md shadow-md border border-neutral-100 text-sm">
                      <p className="text-neutral-500 mb-1">{label}</p>
                      <p className="font-semibold text-neutral-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        {payload[0].value}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey={yKey}
              fill={color}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface AreaChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  dataKey: string
  xKey: string
  color?: string
  height?: number
  className?: string
}

export function AreaChartCard({
  title,
  subtitle,
  data,
  dataKey,
  xKey,
  color = "var(--color-primary-500)",
  height = 280,
  className
}: AreaChartCardProps) {
  const gradientId = React.useId()

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              isAnimationActive={true}
              activeDot={{ r: 5, fill: color, strokeWidth: 2, stroke: "white" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

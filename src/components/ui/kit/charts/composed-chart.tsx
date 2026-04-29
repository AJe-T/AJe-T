"use client"
import * as React from "react"
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface ComposedChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  areas?: { key: string; color: string; name?: string }[]
  bars?: { key: string; color: string; name?: string }[]
  dualAxis?: boolean
  height?: number
  className?: string
}

export function ComposedChartCard({
  title,
  subtitle,
  data,
  areas = [],
  bars = [],
  dualAxis = false,
  height = 280,
  className
}: ComposedChartCardProps) {
  const gradientId = React.useId()

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: dualAxis ? 0 : 30, left: -20, bottom: 0 }}>
            {areas.map((area, i) => (
              <defs key={`def-${i}`}>
                <linearGradient id={`${gradientId}-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={area.color} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={area.color} stopOpacity={0} />
                </linearGradient>
              </defs>
            ))}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-100)" />
            <XAxis
              dataKey={Object.keys(data[0] || {})[0]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-neutral-400)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-neutral-400)', fontSize: 12 }}
            />
            {dualAxis && (
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-neutral-400)', fontSize: 12 }}
              />
            )}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-md shadow-md border border-neutral-100 text-sm">
                      <p className="text-neutral-500 mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={`item-${index}`} className="font-semibold text-neutral-800 flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          {String(entry.name || entry.dataKey)}: {String(entry.value)}
                        </p>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />

            {bars.map((bar, index) => (
              <Bar
                key={`bar-${index}`}
                yAxisId={dualAxis ? "right" : "left"}
                dataKey={bar.key}
                name={bar.name || bar.key}
                fill={bar.color}
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                maxBarSize={40}
              />
            ))}

            {areas.map((area, index) => (
              <Area
                key={`area-${index}`}
                yAxisId="left"
                type="monotone"
                dataKey={area.key}
                name={area.name || area.key}
                stroke={area.color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${gradientId}-${index})`}
                isAnimationActive={true}
                activeDot={{ r: 5, fill: area.color, strokeWidth: 2, stroke: "white" }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

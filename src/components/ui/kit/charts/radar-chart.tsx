"use client"
import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface RadarChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  metrics: string[]
  series: {
    name: string
    color: string
    dataKey?: string
  }[]
  height?: number
  className?: string
}

export function RadarChartCard({
  title,
  subtitle,
  data,
  metrics,
  series,
  height = 280,
  className
}: RadarChartCardProps) {
  // Transform data if needed, but assuming data is already in Recharts radar format:
  // [{ metric: 'Speed', vendorA: 90, vendorB: 80 }, ...]

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="45%" outerRadius="70%" data={data}>
            <PolarGrid stroke="var(--color-neutral-200)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: 'var(--color-neutral-600)', fontSize: 12 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-md shadow-md border border-neutral-100 text-sm">
                      <p className="text-neutral-500 mb-2 font-medium">{label}</p>
                      {payload.map((entry, index) => (
                        <p key={`item-${index}`} className="font-semibold text-neutral-800 flex items-center justify-between gap-4 mb-1">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.name}
                          </span>
                          <span>{entry.value}</span>
                        </p>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />

            {series.map((s, index) => (
              <Radar
                key={`radar-${index}`}
                name={s.name}
                dataKey={s.dataKey || s.name}
                stroke={s.color}
                fill={s.color}
                fillOpacity={0.15}
                strokeWidth={2}
                isAnimationActive={true}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-0">
          {series.map((s, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-1.5 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-neutral-600 font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

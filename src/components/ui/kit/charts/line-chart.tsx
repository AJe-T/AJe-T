"use client"
import * as React from "react"
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface LineChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  lines: {
    key: string
    color: string
    dashed?: boolean
    name?: string
  }[]
  referenceLines?: {
    y: number
    label: string
    color: string
  }[]
  height?: number
  className?: string
}

export function LineChartCard({
  title,
  subtitle,
  data,
  lines,
  referenceLines,
  height = 280,
  className
}: LineChartCardProps) {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-100)" />
            <XAxis
              dataKey={Object.keys(data[0] || {})[0]}
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
            {referenceLines?.map((ref, index) => (
              <ReferenceLine
                key={`ref-${index}`}
                y={ref.y}
                stroke={ref.color}
                strokeDasharray="3 3"
                label={{
                  position: 'right',
                  value: ref.label,
                  fill: ref.color,
                  fontSize: 12,
                  fontWeight: 500
                }}
              />
            ))}
            {lines.map((line, index) => (
              <Line
                key={`line-${index}`}
                type="monotone"
                dataKey={line.key}
                name={line.name || line.key}
                stroke={line.color}
                strokeWidth={2}
                strokeDasharray={line.dashed ? "6 3" : undefined}
                dot={false}
                activeDot={{ r: 5, fill: line.color, strokeWidth: 2, stroke: "white" }}
                isAnimationActive={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

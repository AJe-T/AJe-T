"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface HorizontalBarChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  nameKey: string
  valueKey: string
  color?: string
  height?: number
  className?: string
}

export function HorizontalBarChartCard({
  title,
  subtitle,
  data,
  nameKey,
  valueKey,
  color = "var(--color-primary-500)",
  height = 280,
  className
}: HorizontalBarChartCardProps) {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-neutral-100)" />
            <XAxis
              type="number"
              hide
            />
            <YAxis
              type="category"
              dataKey={nameKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-neutral-600)', fontSize: 14 }}
              width={100}
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
              dataKey={valueKey}
              fill={color}
              radius={[0, 4, 4, 0]}
              barSize={24}
              isAnimationActive={true}
              label={{ position: 'right', fill: 'var(--color-neutral-600)', fontSize: 12, formatter: (val: any) => val }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

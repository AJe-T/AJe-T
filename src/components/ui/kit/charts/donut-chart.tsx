"use client"
import * as React from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardHeader } from "../layout"
import { cn } from "@/lib/utils"

interface DonutChartCardProps {
  title: string
  subtitle?: string
  data: any[]
  nameKey: string
  valueKey: string
  colors: string[]
  centerLabel?: string
  centerValue?: string
  height?: number
  className?: string
}

export function DonutChartCard({
  title,
  subtitle,
  data,
  nameKey,
  valueKey,
  colors,
  centerLabel,
  centerValue,
  height = 280,
  className
}: DonutChartCardProps) {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader title={title} subtitle={subtitle} />
      <div style={{ height }} className="w-full mt-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              cornerRadius={4}
              dataKey={valueKey}
              nameKey={nameKey}
              stroke="none"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0]
                  return (
                    <div className="bg-white p-3 rounded-md shadow-md border border-neutral-100 text-sm">
                      <p className="font-semibold text-neutral-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.fill }} />
                        {data.name}: {data.value}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {centerValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
            <span className="text-3xl font-bold text-neutral-800">{centerValue}</span>
            {centerLabel && (
              <span className="text-xs text-neutral-400 mt-1">{centerLabel}</span>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-1.5 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-neutral-500 font-medium">{entry[nameKey]}</span>
              <span className="text-neutral-800 font-semibold">{entry[valueKey]}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

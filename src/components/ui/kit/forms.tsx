"use client"
import * as React from "react"
import { Search, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
  shortcut?: string
}

export function SearchInput({ className, onSearch, shortcut = "⌘K", ...props }: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center w-[280px]", className)}>
      <Search className="absolute left-3 w-4 h-4 text-neutral-400" />
      <input
        type="text"
        className="w-full h-10 pl-9 pr-12 text-sm bg-white border border-neutral-200 rounded-md outline-none placeholder:text-neutral-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
      {shortcut && (
        <div className="absolute right-2 px-1.5 py-0.5 bg-neutral-100 text-neutral-500 text-[10px] font-medium rounded">
          {shortcut}
        </div>
      )}
    </div>
  )
}

interface DateRangePickerProps {
  presets?: string[]
  onChange?: (date: any) => void
  className?: string
}

export function DateRangePicker({ presets = ["7D", "30D", "90D"], onChange, className }: DateRangePickerProps) {
  const [activePreset, setActivePreset] = React.useState(presets[1])
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center bg-neutral-50 rounded-md p-1 border border-neutral-100">
        {presets.map(preset => (
          <button
            key={preset}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-fast",
              activePreset === preset
                ? "bg-white text-primary-700 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100/50"
            )}
            onClick={() => setActivePreset(preset)}
          >
            {preset}
          </button>
        ))}
      </div>
      <Popover>
        <PopoverTrigger className="h-8 border-neutral-200 text-neutral-600 px-3 w-[240px] justify-start text-left font-normal bg-white inline-flex items-center whitespace-nowrap rounded-md text-sm transition-colors hover:bg-neutral-50 border shadow-sm cursor-pointer outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-neutral-100 shadow-lg" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className="p-3 bg-white pointer-events-auto"
            classNames={{
              day_selected: "bg-primary-500 text-white hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white",
              day_today: "bg-primary-50 text-primary-700",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface FilterSelectProps {
  label: string
  options: { label: string; value: string }[]
  multi?: boolean
  value?: string | string[]
  onChange?: (value: any) => void
  className?: string
}

export function FilterSelect({ label, options, multi = false, value, onChange, className }: FilterSelectProps) {
  return (
    <Select value={value as string} onValueChange={onChange}>
      <SelectTrigger className={cn("h-10 border-neutral-200 bg-white min-w-[140px]", className)}>
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 font-medium">{label}:</span>
          <SelectValue placeholder="All" />
          {multi && Array.isArray(value) && value.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] text-white">
              {value.length}
            </span>
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="border-neutral-100 shadow-md">
        <SelectItem value="all">All</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface ToggleSwitchProps {
  label: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function ToggleSwitch({ label, description, checked, onChange, className }: ToggleSwitchProps) {
  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className="flex flex-col pr-4">
        <span className="text-sm font-semibold text-neutral-700">{label}</span>
        {description && <span className="text-xs text-neutral-400 mt-0.5">{description}</span>}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-primary-500"
      />
    </div>
  )
}

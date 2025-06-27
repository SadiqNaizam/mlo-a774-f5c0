"use client"

import * as React from "react"
import { addDays, format, startOfMonth, subDays, endOfMonth } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange?: (range: DateRange | undefined) => void;
  initialDateRange?: DateRange;
}

export function DateRangePicker({
  className,
  onDateChange,
  initialDateRange,
}: DateRangePickerProps) {
  console.log('DateRangePicker loaded');
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange || {
      from: subDays(new Date(), 29),
      to: new Date(),
    }
  );
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
        setIsOpen(false);
    }
  }

  const presets = [
    { label: "Last 7 Days", range: { from: subDays(new Date(), 6), to: new Date() } },
    { label: "Last 30 Days", range: { from: subDays(new Date(), 29), to: new Date() } },
    { label: "This Month", range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
    { label: "Last Month", range: { from: startOfMonth(subDays(new Date(), 30)), to: endOfMonth(subDays(new Date(), 30)) } },
  ];

  const handlePresetClick = (range: DateRange) => {
    setDate(range);
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="start">
            <div className="flex flex-col space-y-2 p-4 pr-2">
                {presets.map((preset) => (
                    <Button key={preset.label} variant="ghost" className="justify-start" onClick={() => handlePresetClick(preset.range)}>
                        {preset.label}
                    </Button>
                ))}
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
            />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateRangePicker;

"use client"

import * as React from "react"
import { format, addDays, differenceInDays } from "date-fns"
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

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: DateRange;
  onSelect?: (range?: DateRange) => void;
  max?: number;
  onMaxRangeError?: (max: number) => void;
}

export function DateRangePicker({
  className,
  value,
  onSelect,
  max,
  onMaxRangeError,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (onSelect) {
        onSelect(selectedRange);
    } else {
        setDate(selectedRange);
    }

    if (selectedRange?.from && selectedRange?.to && max) {
      const days = differenceInDays(selectedRange.to, selectedRange.from);
      if (days >= max) {
        onMaxRangeError?.(max);
        return;
      }
    }
  }
  
  const displayDate = onSelect ? value : date;

  const disabledDays = React.useMemo(() => {
    if (max && displayDate?.from && !displayDate.to) {
      return { after: addDays(displayDate.from, max - 1) };
    }
    return undefined;
  }, [displayDate, max]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !displayDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayDate?.from ? (
              displayDate.to ? (
                <>
                  {format(displayDate.from, "LLL dd, y")} -{" "}
                  {format(displayDate.to, "LLL dd, y")}
                </>
              ) : (
                format(displayDate.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={displayDate?.from}
            selected={displayDate}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={disabledDays}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

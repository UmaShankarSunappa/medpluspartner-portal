
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
  max?: number;
}

export function DateRangePicker({
  className,
  max
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
        if (max && selectedRange.from && selectedRange.to) {
            const days = differenceInDays(selectedRange.to, selectedRange.from);
            if (days >= max) {
                // If the selected range is greater than or equal to `max`, 
                // reset the selection to only the start date.
                setDate({ from: selectedRange.from, to: undefined });
                return;
            }
        }
        setDate(selectedRange);
    } else {
        setDate(undefined);
    }
  }

  const disabledDays = React.useMemo(() => {
    if (max && date?.from && !date.to) {
      // If a start date is selected, disable all dates after `max` days.
      return { after: addDays(date.from, max - 1) };
    }
    return undefined;
  }, [date, max]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
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
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={disabledDays}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

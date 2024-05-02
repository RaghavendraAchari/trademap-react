import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

export default function DatePicker({ onChange }: { onChange: (date: Date) => void }) {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[160px] max-w-[280px] justify-start text-left font-normal py-0 h-8",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">

                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        setDate(date);

                        date && onChange(date)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
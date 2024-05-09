import React, { useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

export default function DatePicker({ onChange, defaultdDate }: { onChange: (date: Date) => void, defaultdDate?: Date }) {
    const [date, setDate] = React.useState<Date | undefined>(defaultdDate ? defaultdDate : undefined)

    console.log(date);

    useEffect(() => {
        setDate(defaultdDate);
    }, [defaultdDate])

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
                    showOutsideDays={true}
                    selected={date}
                    onSelect={(date) => {
                        setDate(date);

                        date && onChange(date)
                    }}
                    initialFocus
                    toDate={new Date()}
                />
            </PopoverContent>
        </Popover>
    )
}
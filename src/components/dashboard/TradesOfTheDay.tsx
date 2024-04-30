import { CircleOffIcon, PlusCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import TradeDetailsList from "../tradeDetails/TradeDetailsList"
import TradeDetailsForm from "../tradeDetails/TadeDetailsForm"
import NoTradeDayBanner from "./NoTradingDayBanner"
import Trade from "@/models/trade/Trade"
import { ScrollArea } from "../ui/scroll-area"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"


interface Propps {
    trades: Trade[],
    forDate: Date,
    onDataSubmit: () => void,
    maxTradeLimit?: null | number
}

export default function TradesOfTheDay({ trades, forDate, onDataSubmit, maxTradeLimit }: Propps) {

    if (trades[0].isHoliday === true || trades[0].noTradingDay == true || trades[0].isWeekend == true)
        return <NoTradeDayBanner trade={trades[0]} />
    else
        return <ScrollArea className="px-[10px]">
            {
                maxTradeLimit && trades.length >= maxTradeLimit
                    ? <MaxTradeAlert maxTradeLimit={maxTradeLimit} />
                    : null
            }

            <TradeDetailsList tradesList={trades} showFullDate={false} showOptions={true} />

            <div className="flex flex-row justify-center py-2 space-x-4 mt-5">
                <TradeDetailsForm forDate={forDate} onDataSubmit={onDataSubmit} />
                <TodaysNote />
            </div>
        </ScrollArea>
}

export function TodaysNote() {
    const navigate = useNavigate();

    return <Button
        variant={"link"}
        className="space-x-1"
        onClick={() => navigate("/home/dashboard/note")}>
        <span>add daily analysis </span>
        <PlusCircleIcon size={16} />
    </Button>
}

export function MaxTradeAlert({ maxTradeLimit }: { maxTradeLimit: number }) {
    return <Alert className="mt-2 mx-auto items-center space-x-2 shadow mb-2" variant={"destructive"}>
        <CircleOffIcon className="" fill="red" size={24} />
        <AlertTitle>Stop trading for the day</AlertTitle>
        <AlertDescription>You have reached max limit ({maxTradeLimit}) for the day.</AlertDescription>
    </Alert>
}
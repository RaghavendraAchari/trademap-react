import { CircleOffIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import TradeDetailsList from "../tradeDetails/TradeDetailsList"
import TradeDetailsForm from "../tradeDetails/TadeDetailsForm"
import NoTradeDayBanner from "./NoTradingDayBanner"
import Trade from "@/models/trade/Trade"


interface Propps {
    trades: Trade[],
    forDate: Date,
    onDataSubmit: () => void,
    maxTradeLimit?: null | number
}

export default function TradesOfTheDay({ trades, forDate, onDataSubmit, maxTradeLimit }: Propps) {
    if (trades[0].isHoliday === true || trades[0].noTradingDay == true || trades[0].isWeekend == true)
        return <NoTradeDayBanner trade={trades[0]} />
    else return <>
        {
            maxTradeLimit && trades.length >= maxTradeLimit
                ? <Alert className="mt-2 mx-auto  items-center space-x-2" variant={"destructive"}>
                    <CircleOffIcon className="" fill="red" size={24} />
                    <AlertTitle>Stop trading for the day</AlertTitle>
                    <AlertDescription>You have reached max limit ({maxTradeLimit}) for the day.</AlertDescription>
                </Alert>
                : null
        }
        <TradeDetailsList tradesList={trades} showFullDate={false} showOptions={true} />
        <TradeDetailsForm forDate={forDate} onDataSubmit={onDataSubmit} />
    </>
}
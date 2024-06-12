"use client"
import { Separator } from "@/components/ui/separator";
import TradeDetailsForm from "../tradeDetails/TadeDetailsForm";
import { Badge } from "@/components/ui/badge"
import Trade from "@/models/trade/Trade";
import Loading from "@/components/loading/loading";
import NoTradingDayForm from "../tradeDetails/NoTradingDayForm";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { PrinterIcon, Terminal } from "lucide-react";
import { SettingsContext } from "@/context/SettingsContext";
import TradesOfTheDay from "./TradesOfTheDay";


interface props extends React.HTMLAttributes<HTMLDivElement> {
    forDate: Date;
    setForDate: (state: Date) => void,
    onDataSubmit: () => void,
    trades: Trade[] | null,
    loading: boolean,
    error: string | null
}

export default function TradesDetails({ trades, error, loading, forDate, setForDate, onDataSubmit, className, ...props }: props) {
    const [today] = useState<Date>(new Date())
    const settingsContext = useContext(SettingsContext);

    return <div data-tradedetails className={cn(className)} {...props}>
        <div className="flex flex-row justify-between align-center mb-2 flex-none px-3">
            <h3 className="text-lg font-bold">Trades:</h3>
            <div className="flex flex-col justify-end items-center space-y-1 space-x-2 md:flex-none md:flex-row md:justify-end md:space-y-0">
                {trades && <a className="mx-2 hover:cursor-pointer opacity-70 hover:opacity-100" title="Print these trades" onClick={(e) => {e.preventDefault()}}>
                        <PrinterIcon size={24} />
                    </a>}
                {trades && <TotalTrades trades={trades} />}
                {trades && <TotalPnL trades={trades} />}
                <Badge className="mr-2" variant="outline">For: {forDate.toDateString()}</Badge>

                {forDate.toDateString() !== today.toDateString()
                    ? <Badge className="mr-2 hover:cursor-pointer hover:bg-slate-100" variant="outline" onClick={() => setForDate(today)}>Fill for today</Badge>
                    : null
                }
            </div>
        </div>

        <Separator className="flex-none " />

        <div className="grow w-full max-h-full flex flex-col px-0 md:overflow-y-auto">
            {loading ? <Loading /> : null}

            {
                !loading && trades && trades.length === 0
                    ? <>
                        <NoTradesBanner />
                        <TradeDetailsForm forDate={forDate} onDataSubmit={onDataSubmit} />
                        <NoTradingDayForm forDate={forDate} onDataSubmit={onDataSubmit} />
                    </>
                    : null
            }

            {
                !loading && trades && trades.length > 0
                    ? <TradesOfTheDay
                        maxTradeLimit={settingsContext.data?.maxTradesLimit}
                        trades={trades}
                        forDate={forDate}
                        onDataSubmit={onDataSubmit} />
                    : null
            }
            {
                !loading && error && <div className="p-1 px-2"><TradeDetailsError /></div>
            }
        </div>



    </div >
}

function TradeDetailsError() {
    return <Alert variant={"destructive"}>
        <Terminal size={"16px"} />
        <AlertTitle>Oops..</AlertTitle>
        <AlertDescription>Something went wrong while petching the trades</AlertDescription>
    </Alert>
}

function TotalPnL({ trades }: { trades: Trade[] }) {
    if (trades && trades.length > 0 && (trades[0].isHoliday || trades[0].noTradingDay || trades[0].isWeekend))
        return null;

    if (trades?.length === 0)
        return null;

    let total = trades?.reduce((prev, current: Trade) => prev + current.pnl, 0);
    return <span className="text-xs md:text-sm font-semibold my-auto flex justify-end items-center space-x-1">
        <span>Total P&L :</span>
        <Badge className={"mr-2 " + (total < 0 ? " bg-red-400 hover:bg-red-400" : " bg-green-400 hover:bg-green-400")} variant="default">
            {total}
        </Badge>
    </span>
}

function TotalTrades({ trades }: { trades: Trade[] }) {
    if (trades && trades.length > 0 && (trades[0].isHoliday || trades[0].noTradingDay || trades[0].isWeekend))
        return null;

    return <span className="text-xs md:text-sm font-semibold my-auto flex justify-end items-center space-x-1">
        <span>Total trades :</span>
        <Badge className={"mr-2 "} variant="default">
            {trades.length}
        </Badge>
    </span>
}


function NoTradesBanner() {
    return <div className="flex flex-col items-center p-2">
        <img src="/no-data.svg" alt="no-data" className="custom-img" />
        <p className="text-center font-medium text-md mt-2">No trades for today.</p>
    </div>
}



export function InstrumentTypeLogo({ type }: { type: string }) {
    let ob = null;

    if (type === "INDEX")
        ob = { name: "I", color: "text-orange-500" }
    else if (type === "STOCK")
        ob = { name: "S", color: "text-green-500" }
    else
        ob = { name: "C", color: "text-blue-500" }

    return <div className={"bg-background border border-slate-300 w-10 h-10 rounded-full flex justify-center items-center p-1 mr-1 " + ob.color}>
        {ob.name}
    </div>
}


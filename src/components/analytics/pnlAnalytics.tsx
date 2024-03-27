import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowRightIcon, ChevronsDownIcon, ChevronsUpIcon } from "lucide-react";
import Rs from "../commons/rs";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Analytics from "@/models/analytics/analytics";
import currencyFormatter from "@/lib/currencyFormatter";


const cardStyle = "border-2 w-full hover:bg-slate-50 shadow-none cursor-pointer";
const cardHeaderStyle = "text-xl"
const cardValuesStyle = "text-lg font-semibold"


export default function PnlAnalytics({ data: { totalPnl, maxProfitInADay, maxLossInADay, profitMakingDays, lossMakingDays } }: { data: Analytics }) {
    return <Card className="border-0 bg-slate-50 mt-10" >

        <CardHeader>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between md:space-x-2">
                <Card className="w-full min-h-full">
                    <CardHeader className="flex flex-col justify-between">
                        <CardTitle className={cardHeaderStyle}>Total P&L</CardTitle>
                        <CardDescription className={"text-muted-foreground flex flex-row justify-between"}>
                            <span>P&L analysis based on your trades</span>
                            <span className="hidden md:block"><ArrowRightIcon /></span>
                            <span className="block md:hidden"><ArrowDownIcon /></span>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="text-4xl flex items-baseline">
                        {totalPnl >= 0 ? "+" : null}{currencyFormatter.format(totalPnl)} <Rs />
                        {totalPnl > 0 ? <ChevronsUpIcon size={30} className="text-green-400 " /> : <ChevronsDownIcon size={30} className="text-red-400 " />}
                    </CardFooter>
                </Card>
                <Card className={cardStyle + " border-2 border-green-100"}>
                    <CardHeader className="h-full" >
                        <div><img className="h-20" src="/max-profit.svg" alt="Stock icon" /></div>
                        <div className="flex flex-col h-full  justify-between">
                            <CardTitle className={cardHeaderStyle}>Max profit in day</CardTitle>
                            <CardDescription className={cardValuesStyle}>{currencyFormatter.format(maxProfitInADay)}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <Card className={cardStyle + "  border-2 border-red-100"}>
                    <CardHeader className="h-full">
                        <div><img className="h-20" src="/max-loss.svg" alt="fno icon" /></div>
                        <div className="flex flex-col h-full justify-between">
                            <CardTitle className={cardHeaderStyle}>Max loss in day</CardTitle>
                            <CardDescription className={cardValuesStyle}>{currencyFormatter.format(maxLossInADay)}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <div className="w-full flex flex-col space-y-2 justify-between items-stretch">
                    <Card className={cardStyle + " p-0 border h-full w-full space-x-0 space-y-0"}>
                        <CardHeader className="p-2 w-full flex flex-row items-center justify-start space-x-1">
                            <ChevronsUpIcon />
                            <div className="grow flex flex-col items-stretch h-full justify-between ">
                                <CardTitle >
                                    <div className="w-full flex flex-row items-center justify-between text-xl">
                                        <span>Profit making days</span><span>{profitMakingDays}</span>
                                    </div>
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">Days when you made profits</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className={cardStyle + " p-0 border h-full w-full "}>
                        <CardHeader className="p-2 w-full flex flex-row items-center justify-start space-x-1">
                            <ChevronsDownIcon />
                            <div className="grow flex flex-col items-stretch h-full justify-between ">

                                <CardTitle >
                                    <div className="w-full flex flex-row items-center justify-between text-xl">
                                        <span>Loss making days</span><span>{lossMakingDays}</span>
                                    </div>
                                </CardTitle>
                                <CardDescription className={"text-sm text-muted-foreground"}>Days when you made losses</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                    {
                        profitMakingDays < lossMakingDays
                            ? <HoverCard>
                                <HoverCardTrigger className="w-full text-sm bg-green-100 p-2 rounded-md hover:cursor-pointer border-2 border-green-200">You need more work on risk management</HoverCardTrigger>
                                <HoverCardContent className="text-sm" >
                                    Risk Management is the decision you take on tour risk capital. For example if a trade looks like a bad trade, you should either remove quantities or else completely exit the trade.
                                </HoverCardContent>
                            </HoverCard>
                            : null
                    }
                </div>


            </div>
        </CardHeader>
    </Card>
}
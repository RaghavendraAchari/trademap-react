import Trade from "@/models/trade/Trade"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getFullDateTime, getTimeIn12HrFormat } from "@/lib/dateUtils";
import { Label } from "../ui/label";
import { ArrowBigUpDashIcon, ArrowDown, ArrowUp, ChevronsDownIcon, ChevronsUpIcon, IndianRupeeIcon, MoreVertical} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import TradeImageList from "@/routes/test/components/tradeImageList";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TradeRemarksEdit from "./tradeRemarksEdit";


interface Props {
    trade: Trade,
    showFullDate: boolean,
    showOptions?: boolean
}


export default function TradeDetailsCard({ trade, showFullDate, showOptions = false }: Props) {
    const [showImages, setShowImages] = useState(false);

    if (trade.isHoliday || trade.noTradingDay || trade.isWeekend) {
        let title;
        if (trade.isHoliday)
            title = "Holiday"
        else if (trade.noTradingDay)
            title = "No Trading Day"
        else
            title = "Weekend"

        return <Card className="mt-2">
            <CardHeader className="p-2 md:p-6 md:py-2 flex flex-row items-center space-y-0 space-x-1">
                <InstrumentTypeLogo trade={trade} />
                <CardTitle className="flex flex-row justify-between items-center grow">
                    <span className="text-sm md:text-lg">{title}</span>
                    <span className="text-xs md:text-sm  text-slate-500">{showFullDate ? getFullDateTime(new Date(trade.dateTime)) : getTimeIn12HrFormat(new Date(trade.dateTime))}</span>
                </CardTitle>
            </CardHeader>
        </Card>
    }

    return <Card className="mt-2 divide-y">
        <CardHeader className="p-2 md:p-6 md:py-2 flex flex-row items-center justify-start space-y-0 space-x-1">
            <InstrumentTypeLogo trade={trade} />
            <CardTitle className="flex flex-row justify-between items-center grow">
                <span className="text-sm md:text-lg flex flex-row items-center">{trade.setupName} </span>
                {/* <span className="text-start text-muted-foreground text-xs self-baseline ml-1 mt-1">( {trade.id} )</span> */}
                <div className="flex flex-row items-center space-x-1">
                    <span className="text-xs text-right md:text-sm text-slate-500">{showFullDate ? getFullDateTime(new Date(trade.dateTime)) : getTimeIn12HrFormat(new Date(trade.dateTime))}</span>
                    {showOptions && <div>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild className="cursor-pointer ml-1 "><Button size={"icon"} variant={"ghost"}><MoreVertical size={16} /></Button></DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="text-xs">
                                <TradeRemarksEdit trade={trade} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>}

                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6 md:pt-0 space-y-2 space-x-1 flex flex-row justify-between overflow-y-auto ">
            <div className="w-10 h-10 flex-none"></div>
            <div className="grow space-y-2">
                <p className="text-muted-foreground text-sm font-semibold underline underline-offset-[6px]">Remarks:</p>
                <div className="text-sm text-slate-700 py-2 whitespace-pre-wrap">{trade.remarks}</div>
                <div className="flex justify-start space-x-1 items-center text-xs font-medium">
                    <span className="bg-orange-200 p-1 rounded-sm ">{trade.instrumentType}</span>
                    <span>{"->"}</span>
                    <span className="bg-green-200 p-1 rounded-sm">{trade.instrumentName}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-xs text-slate-600 font-semibold self-center justify-center">{trade.imagePaths.length.toString() + " image(s)"}</p>
                    <Button size={"sm"} variant={"link"} className="cursor-pointer flex flex-row justify-end  space-x-1 items-center  select-none py-0 px-4" onClick={() => setShowImages(prev => !prev)}>
                        {
                            !showImages ?
                                <><Label className="cursor-pointer text-xs font-semibold text-slate-600" htmlFor="arrow-down p-0" >Show Images</Label>
                                    <ArrowDown id="arrow-down" className="h-4 w-4" /></>
                                : <>
                                    <Label className="cursor-pointer text-xs font-semibold text-slate-600" htmlFor="arrow-down p-0" >Hide Images</Label>
                                    <ArrowUp id="arrow-down" className="h-4 w-4" /></>}
                    </Button>

                </div>
                {
                    showImages && <div className="images">
                        <TradeImageList trade={trade} />
                    </div>
                }
            </div>
        </CardContent>
        <CardFooter className="p-2 md:p-6 flex justify-start align-center py-2 space-x-1">
            <div className="w-10"></div>

            <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row justify-between w-full text-center">
                <Button className="space-x-1" variant={"outline"}><ArrowBigUpDashIcon /><span>RR on index chart : </span><span>{trade.riskToReward.toString()}</span></Button>
                {
                    trade.instrumentType === "INDEX" ? <Button className="space-x-1" variant={"outline"}><ArrowBigUpDashIcon /><span>RR on FnO chart : </span><span>{trade.riskToRewardOnPremium.toString()}</span></Button>
                        : null
                }
                <Button className="space-x-1" variant={"outline"}><IndianRupeeIcon size={16} /><span>P&L : </span><span>{trade.pnl.toString()}</span> <span>{trade.pnl > 0 ? <ChevronsUpIcon className="text-green-600" /> : <ChevronsDownIcon className="text-red-600" />} </span></Button>
            </div>
        </CardFooter>
    </Card>
}


export function InstrumentTypeLogo({ trade }: { trade: Trade }) {
    let ob = null;

    if (trade.instrumentType === "INDEX")
        ob = { name: "I", color: "text-orange-500" }
    else if (trade.instrumentType === "STOCK")
        ob = { name: "S", color: "text-green-500" }
    else if (trade.instrumentType === "COMMODITY")
        ob = { name: "C", color: "text-blue-500" }
    else if (trade.isHoliday)
        ob = { name: "H", color: "text-blue-500" }
    else if (trade.noTradingDay)
        ob = { name: "X", color: "text-red-500" }
    else
        ob = { name: "W", color: "text-blue-500" }


    return <Avatar className="border font-semibold ">
        <AvatarFallback className={ob.color}>{ob.name}</AvatarFallback>
    </Avatar>
}






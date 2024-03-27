import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Analytics from "@/models/analytics/analytics";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";

const cardStyle = "border-2 w-full hover:bg-slate-50 shadow-none cursor-pointer";
const cardHeaderStyle = "text-xl"
const cardValuesStyle = "text-lg font-semibold"

export default function TradedSegmentsDetails({ data: { totalTrades, totalTradesInStock, totalTradesInIndex, totalTradesInCommodity } }: { data: Analytics }) {
    return <Card className="border-0 bg-violet-50 mt-10" >

        <CardHeader>
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between md:space-x-2">
                <Card className="w-full min-h-full">
                    <CardHeader className="flex flex-col justify-between">
                        <CardTitle className={cardHeaderStyle}>Total trades taken</CardTitle>
                        <CardDescription className={"text-muted-foreground flex flex-row"}>
                            <span>Segregation of trades with respect to different instrument types</span>
                            <span className="hidden md:block"><ArrowRightIcon /></span>
                            <span className="block md:hidden"><ArrowDownIcon /></span>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="text-4xl">{totalTrades} Trades</CardFooter>
                </Card>
                <Card className={cardStyle + " "}>
                    <CardHeader className="h-full" >
                        <div><img className="h-20" src="/stock.svg" alt="Stock icon" /></div>
                        <div className="flex flex-col h-full  justify-between">
                            <CardTitle className={cardHeaderStyle}>Trades taken in <br /> stocks</CardTitle>
                            <CardDescription className={cardValuesStyle}>{totalTradesInStock}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <Card className={cardStyle + " "}>
                    <CardHeader className="h-full">
                        <div><img className="h-20" src="/fno.svg" alt="fno icon" /></div>
                        <div className="flex flex-col h-full  justify-between">
                            <CardTitle className={cardHeaderStyle}>Trades taken in <br /> FnO</CardTitle>
                            <CardDescription className={cardValuesStyle}>{totalTradesInIndex}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                <Card className={cardStyle + " "}>
                    <CardHeader className=" h-full">
                        <div><img className="h-20" src="/commodity.svg" alt="commodity icon" /></div>
                        <div className="flex flex-col items-stretch h-full justify-between">
                            <CardTitle className={cardHeaderStyle}>Trades taken in <br /> commodity</CardTitle>
                            <CardDescription className={cardValuesStyle}>{totalTradesInCommodity}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>

            </div>
        </CardHeader>
    </Card>
}
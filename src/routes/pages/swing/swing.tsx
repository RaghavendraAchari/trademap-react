import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "./Chart";
import { useState } from "react";
import DisplayHeader from "@/components/commons/DisplayHeader";

type Stock = {
    name: string,
    id: number,
}

export default function Swing() {
    const [stockList, setStockList] = useState<Stock[]>([
        {
            id: 1,
            name: "ITC"
        },
        {
            id: 2,
            name: "Asian Paint"
        },
        {
            id: 3,
            name: "HUL"
        },
        {
            id: 4,
            name: "Angel One"
        },
    ]);

    const [timeline, setTimeline] = useState<EditorJS.OutputData>();

    return <>
        <DisplayHeader title="Swing Trade" description="Actively monitor and track short term trades." className='flex-none bg-background p-3' />
        <div className="md:grid md:grid-cols-[25%_75%] gap-1 p-2 px-3">
        <div className="">
            <h3 className="border-b">Watchlist :</h3>
            <div className="space-y-1 mt-2">
                {
                    stockList.map(stock => <Card key={stock.id} className="cursor-pointer">
                    <CardHeader className="p-3 text-sm">
                            {stock.name}
                    </CardHeader>
                    </Card>)
                }
            </div>
        </div>
        <div className="">
            <h3>Timeline :</h3>

        </div>
    </div>
    </>
}
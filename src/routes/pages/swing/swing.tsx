import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "./Chart";


export default function Swing() {
    return <div className="md:grid md:grid-cols-[25%_75%] gap-1 p-2 px-3">
        <div className="">
            <h3 className="border-b">Watchlist :</h3>
            <div className="space-y-1 mt-2">
                <Card className="cursor-pointer">
                    <CardHeader className="p-3 text-sm">
                        Stock Name
                    </CardHeader>
                </Card>
                <Card className="cursor-pointer">
                    <CardHeader className="p-3 text-sm">
                        Stock Name
                    </CardHeader>
                </Card>
                <Card className="cursor-pointer">
                    <CardHeader className="p-3 text-sm">
                        Stock Name
                    </CardHeader>
                </Card>
            </div>
        </div>
        <div className="">
            <h3>Timeline :</h3>
            <Chart />
        </div>
    </div>
}
import DisplayHeader from "@/components/commons/DisplayHeader";
import { Badge } from "@/components/ui/badge";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import backendUrls from "@/constants/backendUrls";
import Trade from "@/models/trade/Trade";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom";


export default function TradePreview() {
    const location = useLocation();
    const [counter, setCounter] = useState(0);

    // console.log(location.state);
    // console.log(counter);

    let trades = location.state as Trade[];

    let trade = location.state[counter] as Trade;

    const handleKeyUp = async (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            console.log("Right pressed");

            setCounter(prev => {
                if (prev >= trades.length - 1)
                    return prev
                else return prev + 1
            })

        } else if (e.key === "ArrowLeft") {
            console.log("Left pressed");

            setCounter(prev => {
                if (prev <= 0)
                    return prev
                else return prev - 1
            })
        }
    }

    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        }
    }, [])

    return <>
        <DisplayHeader title="Trades Review" description="Review your trades with details" className='flex-none bg-background p-3' />

        <div className="flex flex-col h-full overflow-y-auto bg-background px-3 py-2" >
            <div className="p-2 mb-1 text-muted-foreground font-medium text-sm">Date: {format(new Date(trade.dateTime), "d MMM yyyy")} <span className="ml-10">Total trades: {trades.length}</span> </div>
            <ResizablePanelGroup className="max-w-full border rounded overflow-y-scroll" direction="horizontal" >
                <ResizablePanel className="sticky max-w-full h-full overflow-y-auto" defaultSize={30} minSize={30} maxSize={70}>
                    <TradeDetails trade={trade} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="p-2 overflow-y-auto" minSize={30} defaultSize={70} >
                    <div className="overflow-y-auto max-h-full">
                        <DisplayTradeImages trade={trade} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </>
}

function TradeDetails({ trade }: { trade: Trade }) {
    return <div className="text-sm bg-background prose h-full max-w-full prose-h3:leading-none flex flex-col">
        <h3 className="bg-purple-200 p-3 flex-none">{trade.setupName}</h3>
        <div className="px-3 flex flex-col justify-between grow">
            <div className="flex flex-col space-y-4">
                <p className="font-semibold space-x-2 m-0"><span>Result :</span> <span className={`shadow-inner inline-block p-1 px-2 h-7 w-32 text-center ${(trade.resultType === "Target" || trade.resultType === "PartialTarget") ? "bg-green-200" : "bg-red-200"}`}>{trade.resultType}</span></p>
                <p className="font-semibold underline underline-offset-4 m-0">Remarks:</p>
                <p className="whitespace-pre-wrap m-0 bg-white rounded py-2 text-sm font-medium min-h-64">{trade.remarks}</p>
            </div>

            <div className="">
                <p className="font-semibold space-x-2"><span>Risk to reward ratio:</span> <Badge>{trade.riskToReward}</Badge></p>
                {trade.instrumentType === "INDEX" ? <p className="font-semibold space-x-2 "><span>Risk to reward on FnO chart:</span> <Badge >{trade.riskToRewardOnPremium}</Badge> </p> : null}
            </div>
        </div>
    </div>
}

function DisplayTradeImages({ trade }: { trade: Trade }) {
    return <>
        {trade.imagePaths.map(path => {
            return <img src={backendUrls.tradeDetails.getImageDownloadablePath(path)} alt="image path" className="py-2" />
        })}
    </>
}
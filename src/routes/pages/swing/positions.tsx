import { ScrollArea } from "@/components/ui/scroll-area";
import { PositionCard } from "./components/positionCard";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FolderClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HTMLAttributes } from "react";
import { Stock } from "./swing";
import useFetch from "@/hooks/useFetch";
import { SwingPosition } from "@/models/swing/swingPosition";
import backendUrls from "@/constants/backendUrls";

interface Props extends HTMLAttributes<HTMLDivElement>{
    selectedStock: Stock
}
export default function Positions({selectedStock}:Props){
    return <div className="h-full max-w-full  divide-y flex flex-col min-h-full overflow-y-auto">
        <h3 className="px-3 py-3 bg-purple-100 flex-none flex flex-row items-center space-x-2"><FolderClockIcon size={20} /> <span className=" font-semibold">Positions</span></h3>
        <ScrollArea className="grow px-2 overflow-y-auto">
            <div className="w-full h-full flex flex-col">
                <PositionCard  key={1}/>
                <PositionCard  key={2}/>
                <PositionCard  key={3}/>
                <Dialog>
                    <DialogTrigger asChild><Button>+ Add new position</Button></DialogTrigger>
                    <DialogContent>

                    </DialogContent>
                </Dialog>
            </div>
        </ScrollArea>
        <div className="p-2 px-3 text-md font-bold flex-none flex flex-row justify-between items-center bg-background ">
            <p>Total P&L {"->"}</p>
            <p>23,000 Rs</p>
        </div>
    </div>
}
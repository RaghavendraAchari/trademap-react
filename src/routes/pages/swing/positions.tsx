import { ScrollArea } from "@/components/ui/scroll-area";
import { PositionCard } from "./components/positionCard";
import { FolderClockIcon } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { Stock } from "./swing";
import useFetch from "@/hooks/useFetch";
import { SwingPosition } from "@/models/swing/swingPosition";
import backendUrls from "@/constants/backendUrls";
import { motion } from "framer-motion";
import Loader from "@/components/commons/LoadingSpinner";
import AddNewPosition from "./components/addNewSwingPosition";


interface Props extends HTMLAttributes<HTMLDivElement>{
    selectedStock: Stock | null | undefined
}

export default function Positions({selectedStock}:Props){
    // console.log({selectedStock});
    
    const {data, error, loading, refresh} = useFetch<SwingPosition[]>(`${backendUrls.swing.swingPositions}${selectedStock?.instrumentName ? '?stockName=' + selectedStock?.instrumentName : ""}`);

    return <div className="h-full max-w-full  divide-y flex flex-col min-h-full overflow-y-auto">
        <h3 className="px-3 py-3 bg-purple-100 flex-none flex flex-row items-center space-x-2"><FolderClockIcon size={20} /> <span className=" font-semibold">Positions</span></h3>
        {
            !selectedStock ? <div className="w-full p-2">
                <p className="p-3 py-5 text-center text-muted-foreground text-md">Select the stock from the watchlist panel.</p>
                </div>
                : <>
                { loading && <div className="p-3 flex justify-center items-center"><Loader loading /></div> }
                { !loading && data && data.length === 0 && <NoPositions stockName={selectedStock.instrumentName} onAddSuccess={refresh}/> }
                { !loading && data && data.length > 0 && <SwingPositions onAddSuccess={refresh} positions={data}/>}
            </>
        }
        
        
    </div>
}

export function SwingPositions({positions, onAddSuccess}:{positions: SwingPosition[], onAddSuccess : () => void}){
    const [pnl, setPnl] = useState<number[]>()

    return <>
        <ScrollArea className="grow px-2 overflow-y-auto">
        <div className="w-full h-full flex flex-col">
            {
                positions.map((it, index) => {
                    return <PositionCard number={(index + 1)} position={it} key={it.id} setPnl={setPnl}/>
                })
            }
            
            <AddNewPosition onAddSuccess={onAddSuccess}  stockName={"ITC"}/>
        </div>
        </ScrollArea>

        <div className="p-2 px-3 text-md font-bold flex-none flex flex-row justify-between items-center bg-background ">
            <p>Total P&L {"->"}</p>
            <p>{(pnl && pnl.length) ? pnl.reduce((prev, cur) => prev + cur, 0).toFixed(2) : "-" } </p>
        </div>
    </>
}


export function NoPositions({stockName, onAddSuccess}:{stockName: string, onAddSuccess : () => void}){
    return <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="p-3 text-center flex flex-col space-y-4 text-muted-foreground text-md">
        <img src="/schedule.png" alt="swing" className="w-full object-contain h-24 mt-2 opacity-70" />
        <p>No positions yet.</p>
        <AddNewPosition stockName={stockName} onAddSuccess={onAddSuccess}/>
    </motion.div>
}
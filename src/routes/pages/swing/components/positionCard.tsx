import { SwingTrade } from "@/models/swing/swingTrade"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useState } from "react"
import { SwingTradeCard } from "./swingTradeCard"
import { NewTradeForm } from "./newTradeForm"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { SwingPosition } from "@/models/swing/swingPosition"

interface Props extends HTMLAttributes<HTMLDivElement>{
    position: SwingPosition
    number: number
    setPnl: Dispatch<SetStateAction<number[] | undefined>>
}

export function PositionCard({number, position, setPnl}:Props){
    const [showTrades, setShowTrades] = useState(false)

    let pnl: number | null, invested, sold;
    let positionSquaredOff = false;

    if(position.trades.length > 0){
        invested = position.trades.filter(it => it.orderType === "BUY").map(it => it.avgEntryPrice ? it.avgEntryPrice * it.quantity!! : 0).reduce((prev, curr) => prev + curr, 0);
        sold = position.trades.filter(it => it.orderType === "SELL").map(it => it.avgExitPrice ? it.avgExitPrice * it.quantity!! : 0).reduce((prev, curr) => prev + curr, 0);

        let investedQuantity = position.trades.filter(it => it.orderType === "BUY").map(it => it.quantity || 0).reduce((prev, cur) => prev + cur, 0);
        let soldQuantity = position.trades.filter(it => it.orderType === "SELL").map(it => it.quantity || 0).reduce((prev, cur) => prev + cur, 0);

        if(investedQuantity === soldQuantity){
            positionSquaredOff = true
            pnl = sold - invested

            
        }
    }

    const [newTrades, setNewTrades] = useState<SwingTrade[]>()

    const handleAddNewTrades = () => {

    }

    useEffect(()=> {
        if(pnl)
            setPnl(prev => {
                if(prev)
                    return [...prev, pnl ]

                return [pnl]
            })
    }, [])

    return <div className="p-3 rounded mb-2 bg-background border-b ">
        <h2 className="font-bold text-xl">{number}</h2>
        <p className="text-sm flex flex-row justify-between mt-2">
            <span className="text-slate-600 font-semibold space-x-2">
                <span>Date:</span> 
                <span>{format(new Date(position.createdDate), "d MMM yyyy")}</span>
            </span>
            <span className="space-x-2">
                <span className="font-semibold text-slate-600 text-sm">P&L: </span>
                <span className="text-green-500 font-bold">{pnl ? pnl.toFixed(2) + " Rs" : "-"}</span>
            </span>    
        </p>
        <p className="text-sm flex flex-row justify-between text-slate-600">
            <span className=" font-semibold space-x-2">
                <span>Total invested:</span>  
                <span>{invested ? invested?.toFixed(2) + " Rs" : "-"}</span></span>
            <span>
                <span className="font-semibold text-sm space-x-2">Total sold: </span>
                <span className="font-bold">{sold ? sold.toFixed(2) + " Rs" : "-"} </span>
            </span>    
        </p>

        <motion.div className="mt-5 space-y-2 flex flex-col items-center">
                <AnimatePresence initial={false}>
                    {
                        showTrades && <motion.section
                            className="w-full space-y-2"
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                            open: { opacity:1, height: "auto" , },
                            collapsed: { opacity:0, height: 0,  }
                            }}
                            transition={{ duration: 0.3, easings:["easeInOut"] }}>
                            {
                                position.trades.map(it => <SwingTradeCard key={it.id} trade={it}/>)
                            }
                            {
                                newTrades && newTrades.map((it, index) => <SwingTradeCard trade={it} key={index}/>)
                            }

                            <NewTradeForm onSubmit={(trade) => {
                                setNewTrades(prev => {
                                    if(prev){
                                        return [...prev, trade]
                                    }

                                    return [trade]
                                })
                            }} />
                            {
                                newTrades && newTrades.length && <div className="flex flex-row justify-center items-center ">
                                    <Button className="self-center rounded-full" variant={"secondary"} size={"sm"}>Update the position</Button>
                                </div>
                            }
                    
                    </motion.section>
                    }
                </AnimatePresence>
                
            </motion.div>
        
        <Button className="flex w-6 h-6 mt-2 rounded-full mx-auto" variant={"ghost"} size={"icon"} onClick={() => setShowTrades(!showTrades)}>
            {showTrades ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
        </Button>
    </div>
}

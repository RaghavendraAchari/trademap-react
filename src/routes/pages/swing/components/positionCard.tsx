import { SwingTrade } from "@/models/swing/swingTrade"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { HTMLAttributes, useState } from "react"
import { SwingTradeCard } from "./swingTradeCard"
import { NewTradeForm } from "./newTradeForm"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface Props extends HTMLAttributes<HTMLDivElement>{
    date: Date
    invested: number
    sold: number
    trades: SwingTrade[]
}

export function PositionCard(){
    const [showTrades, setShowTrades] = useState(false)

    return <div className="p-3 rounded mb-2 bg-background border-b ">
        <h2 className="font-bold text-xl">1</h2>
        <p className="text-sm flex flex-row justify-between mt-2">
            <span className="text-slate-600 font-semibold space-x-2">
                <span>Date:</span> 
                <span>{format(new Date(), "d MMM yyyy")}</span>
            </span>
            <span className="space-x-2">
                <span className="font-semibold text-slate-600 text-sm">P&L: </span>
                <span className="text-green-500 font-bold"> +1000 rs</span>
            </span>    
        </p>
        <p className="text-sm flex flex-row justify-between text-slate-600">
            <span className=" font-semibold space-x-2">
                <span>Total invested:</span>  
                <span>23,000 rs</span></span>
            <span>
                <span className="font-semibold text-sm space-x-2">Total sold: </span>
                <span className="font-bold"> 24,000 rs</span>
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
                            <SwingTradeCard />
                            <SwingTradeCard />
                            <NewTradeForm />
                    
                    </motion.section>
                    }
                </AnimatePresence>
                
            </motion.div>
        
        <Button className="flex w-6 h-6 mt-2 rounded-full mx-auto" variant={"ghost"} size={"icon"} onClick={() => setShowTrades(!showTrades)}>
            {showTrades ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
        </Button>
    </div>
}

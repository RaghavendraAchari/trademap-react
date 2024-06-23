import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SwingTrade } from "@/models/swing/swingTrade"
import { useState } from "react"
import { NewTradeForm } from "./newTradeForm"
import { SwingTradeCard } from "./swingTradeCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import http from "@/hooks/axiosConfig"
import backendUrls from "@/constants/backendUrls"
import { useToast } from "@/components/ui/use-toast"

export default function AddNewPosition({stockName, onAddSuccess}:{stockName: string, onAddSuccess: () => void}){
    const [trades, setTrades] = useState<SwingTrade[]>()
    const {toast} = useToast();

    const [open, setOpen] = useState<boolean>(false)

    const handleOnSave = () => {
        const data = {
            stockName: stockName,
            trades: trades?.map(it => {
                it.id = null
    
                return it
            }) || null
        }

        http.post(backendUrls.swing.swingPositions, data)
        .then(res => {
            if(res.status !== 200)
                toast({title: "Error in creating position.!"})

            onAddSuccess()

        })
        .catch(err => console.log(err))
        .finally(() => setOpen(false))
    }

    return <Dialog open={open} onOpenChange={(open) => {setTrades(undefined); setOpen(open);}}>
    <DialogTrigger asChild><Button className="rounded-full w-fit mx-auto">+ Add new position</Button></DialogTrigger>
    <DialogContent className="">
        <DialogHeader>
            <DialogTitle>Create position</DialogTitle>
        </DialogHeader>
        <div className="max-h-[600px] ">
            <h3 className="font-bold text-2xl pb-4">{stockName}</h3>

            <p className="border-b text-muted-foreground font-semibold mb-2">Add trade details</p>
            <ScrollArea className=" min-h-0 max-h-[250px] overflow-y-auto">
            {
                trades && trades.length > 0
                ? <div className="flex flex-col space-y-2 p-2">
                    {trades.map(it => {
                        return <SwingTradeCard key={it.id} trade={it}/>
                    })}
                </div>
                : null
            }
            </ScrollArea>
            
            <div className="p-3">
                <NewTradeForm onSubmit={(trade: SwingTrade) => {
                    
                    setTrades(prev => {
                        if(!prev){
                            trade.id = 0
                            return [trade]
                        }

                        trade.id = prev.length
                        
                        return [...prev, trade]
                    })
                }}/>
            </div>
        </div>
        <DialogFooter>
            {   
                trades && trades?.length > 0 
                ? <DialogClose onClick={(e) => {e.preventDefault(); handleOnSave();}} asChild><Button>Create position with trades</Button></DialogClose>
                : <DialogClose onClick={(e) => {e.preventDefault(); handleOnSave();}} asChild><Button>Create and add trades later</Button></DialogClose>
            }
            <DialogClose asChild><Button variant={"outline"}>Cancel</Button></DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>
}
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CctvIcon, CirclePlusIcon, Trash2Icon } from "lucide-react";
import { Stock } from "./swing";
import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import http from "@/hooks/axiosConfig";
import backendUrls from "@/constants/backendUrls";

interface Props extends HTMLAttributes<HTMLDivElement>{
    stockList?: Stock[], 
    setSelectedStock: Dispatch<SetStateAction<Stock | undefined>>, 
    selectedStock?: Stock, 
    // setStockList: Dispatch<SetStateAction<Stock[]>>
    addNewStock: (stockName: string) => void
    onDelete: (id:number) => void
}

export default function Watchlist({stockList, setSelectedStock, selectedStock, className, addNewStock, onDelete}:Props){
    const [newStock, setNewStock] = useState<string>("")

    return <div className={cn("h-full flex flex-col max-h-full", className)}>
    <div className="divide-y grow">
        <h3 className="px-3 py-3 bg-purple-100 flex-none flex flex-row items-center space-x-2"><CctvIcon size={20} /><span className=" font-semibold"> Watchlist</span></h3>
        <div className="h-full flex flex-col divide-y space-y-1 grow">
            {
                stockList && stockList.map(stock => <Card 
                    key={stock.id} 
                    className={`cursor-pointer rounded-none border-none hover:bg-purple-50 ${(selectedStock && stock.id === selectedStock.id) ? "bg-purple-50 " : " "}`}
                    onClick={()=> setSelectedStock(stock)}>
                        <CardHeader className="p-3 text-sm font-semibold flex flex-row justify-between group">
                                <span>{stock.instrumentName}</span> <span><Trash2Icon  size={16} className="invisible cursor-pointer opacity-70 group-hover:visible hover:opacity-100" onClick={() => onDelete(stock.id)}/></span>
                        </CardHeader>
                </Card>)
            }
            {
                stockList && stockList.length === 0
                ? <div className="text-sm font-semibold text-muted-foreground p-2 text-center">
                    Your watchlist is empty.. <br /><br />
                    Add stocks using the form below.
                </div>
                : null
            }
            
        </div>
    </div>
    <div className="space-y-2 flex-none px-3 flex justify-center flex-col">
        <Input 
           value={newStock}
           onKeyUp={e => {
            e.preventDefault();

            if(e.key === "Enter")
                addNewStock(newStock);
           }}
            onChange={(e) => {
            setNewStock(e.currentTarget.value)
            e.preventDefault()
        }}
            type="text"
            name="newStock"
            id="newStock"
        />
        <Button className="space-x-1" size={"sm"} variant={"ghost"} onClick={() => addNewStock(newStock)}><CirclePlusIcon size={16} /> <span>Add new stock</span></Button>
    </div>
</div>
}
import DatePicker from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CircleXIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SwingTrade } from "@/models/swing/swingTrade";
import { getDateInISOAsLocalDate } from "@/lib/dateUtils";
import { AnimatePresence, motion } from "framer-motion";

export function NewTradeForm({onSubmit}:{onSubmit: (trade: SwingTrade) => void}){
    const [date, setDate] = useState<Date>(new Date());
    const [orderType, setOrderType] = useState<"BUY"|"SELL">("BUY");
    const [quantity, setQuantity] = useState<string>("");
    const [avgPrice, setAvgPrice] = useState<string>("");

    const [showForm, setShowForm] = useState(false)

    const handleOnSubmit = () => {
        const trade: SwingTrade = {
            id: null,
            orderType: orderType,
            quantity: parseFloat(quantity),
            avgEntryPrice: orderType === "BUY" ? parseFloat(avgPrice) : null,
            avgExitPrice: orderType === "SELL" ? parseFloat(avgPrice) : null,
            date: getDateInISOAsLocalDate(date as Date)

        }

        onSubmit(trade);
    }
    
    return showForm ? <motion.div initial={{opacity: 0, scale: '0.5'}} animate={{opacity:1, scale: "1" }} exit={{opacity: 0, }} 
     
            className="w-full max-w-full border rounded-md p-2 space-y-2 text-sm font-semibold">
        <div className="flex flex-row justify-end items-end w-full">
            <Button size={"icon"} variant={"ghost"} className="opacity-70 h-5 w-5" onClick={() => setShowForm(false)}><CircleXIcon size={16}/></Button>
        </div>

        <div className="p-3 space-y-2">
            <div className="flex items-center space-x-2">
                <span className="w-32">Order Type:</span> 
                <Label htmlFor="orderType">Sell</Label>
                <Switch id="orderType" checked={orderType === "BUY"} onCheckedChange={(value) => {
                    if(value === true)
                        setOrderType("BUY")
                    else
                        setOrderType("SELL")
                }} className="data-[state=unchecked]:bg-red-500 data-[state=checked]:bg-green-500"/>
                <Label htmlFor="orderType">Buy</Label>
            </div>

            <div className="flex items-center space-x-2">
                <span  className="w-32">Order Date:</span> 
                <DatePicker defaultdDate={date} onChange={(date) => {
                    setDate(date)
                }} />
            </div>

            <div className="flex items-center space-x-2">
                <span  className="w-32">Quantity:</span> <Input className="w-56" type="number"  step={0.01} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </div>

            <div className="flex items-center space-x-2">
                <span className="w-32">Avg Price: </span> <Input className="w-56" type="number" step={0.01} value={avgPrice} onChange={(e) => setAvgPrice(e.target.value)} />
            </div>

            <div className="pt-3 flex items-end justify-start space-x-2">
                <span className="w-32"></span>
                <Button size={"sm"} type="submit" variant={"outline"} onClick={() => {handleOnSubmit()}}>Add this trade</Button>
            </div>
        </div>
        

    </motion.div> :  <Button onClick={() => setShowForm(true)} size={"sm"} className="w-full" variant={"link"}>+ Add new trade</Button> ;

}
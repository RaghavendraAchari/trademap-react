import DatePicker from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CircleXIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function NewTradeForm(){
    const [date, setDate] = useState<Date>();
    const [orderType, setOrderType] = useState<"BUY"|"SELL">();
    const [quantity, setQuantity] = useState<number>();
    const [avgPrice, setAvgPrice] = useState<number>();

    const [showForm, setShowForm] = useState(false)

    return showForm ? <form className="w-full border p-2 space-y-2 text-sm font-semibold">
        <div className="flex flex-row justify-end items-end w-full">
            <Button size={"icon"} variant={"ghost"} className="opacity-70 h-5 w-5" onClick={() => setShowForm(false)}><CircleXIcon size={16}/></Button>
        </div>
        <div className="flex items-center space-x-2">
            <span className="w-32">Order Type:</span> 
            <Label htmlFor="orderType">Sell</Label>
            <Switch id="orderType" className="data-[state=unchecked]:bg-red-500 data-[state=checked]:bg-green-500"/>
            <Label htmlFor="orderType">Buy</Label>
        </div>

        <div className="flex items-center space-x-2">
            <span  className="w-32">Order Date:</span> 
            <DatePicker defaultdDate={new Date()} onChange={() => {}} />
        </div>

        <div className="flex items-center space-x-2">
            <span  className="w-32">Quantity:</span> <Input className="w-56" type="number"  step={0.01} />
        </div>

        <div className="flex items-center space-x-2">
            <span className="w-32">Avg Price: </span> <Input className="w-56" type="number" step={0.01} />
        </div>

    </form> :  <Button onClick={() => setShowForm(true)} size={"sm"} className="w-full" variant={"link"}>+ Add new trade</Button> ;

}
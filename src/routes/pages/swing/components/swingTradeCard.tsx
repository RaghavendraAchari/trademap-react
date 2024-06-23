import { getFullDateTime } from "@/lib/dateUtils";
import { SwingTrade } from "@/models/swing/swingTrade";
import { format } from "date-fns";
import { IndianRupeeIcon } from "lucide-react";

export function SwingTradeCard({trade}:{trade ?: SwingTrade}){
    return <div className={`border rounded-xl w-full flex text-sm text-slate-700 font-semibold p-2 px-5 justify-between items-center ${trade?.orderType === "BUY" ? "bg-green-50 border-green-600" : "bg-red-50 border-red-600"}`}>
        <span className={`w-12 flex-none rounded-md shadow-md border p-2 font-bold  bg-background ${trade?.orderType === "BUY" ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}`}>{trade?.orderType === "BUY" ? "BUY" : "SELL"}</span>
        <span>{trade && trade.date && format(new Date(trade.date), "dd-MMM-yy")}</span>
        <span>Q: {trade?.quantity}</span>
        <span><IndianRupeeIcon className="inline-block" size={14} />{trade?.orderType === "BUY" ? trade?.avgEntryPrice : trade?.avgExitPrice} </span>
    </div>
}
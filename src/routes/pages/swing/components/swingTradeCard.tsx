import { SwingTrade } from "@/models/swing/swingTrade";

export function SwingTradeCard({trade}:{trade ?: SwingTrade}){
    return <div className="bg-green-300 border rounded w-full flex text-sm text-slate-700 font-semibold p-2 justify-between items-center">
        <span className="w-12 flex-none border border-green-500 text-green-600 p-2 font-bold  bg-background">BUY</span>
        <span>23-02-2024</span>
        <span>Q: 25</span>
        <span>234.5 rs</span>
    </div>
}
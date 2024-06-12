export interface SwingTrade{
    orderType: "BUY" | "SELL"
    avgEntryPrice: number
    avgSellingPrice: number
    date: Date
}
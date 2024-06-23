export interface SwingTrade{
    id: number | null
    orderType: "BUY" | "SELL"
    avgEntryPrice: number | null
    avgExitPrice: number | null
    date: string | Date
    quantity: number | null
}
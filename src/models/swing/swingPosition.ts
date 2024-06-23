import { SwingTrade } from "./swingTrade"

export interface SwingPosition{
    id: number
    stockName: string
    lastUpdatedDate: string
    createdDate: string
    userId: string
    trades: SwingTrade[]
}
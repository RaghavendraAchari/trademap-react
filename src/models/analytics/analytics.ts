export default interface Analytics {
    userId: number; //for future reference
    totalInvestment: number
    totalDays: number
    totalWeekends: number
    totalNoTradingDays: number
    totalHolidays: number
    totalTradedDays: number
    totalTrades: number
    totalTradesInStock: number
    totalTradesInIndex: number
    totalTradesInCommodity: number
    totalPnl: number
    maxProfitInADay: number
    maxLossInADay: number
    dateOfMaxProfit: string
    dateOfMaxLoss: string
    noOfProfitTrades: number
    noOfLossTrades: number
    profitMakingDays: number
    lossMakingDays: number
    dateWiseProfit: { date: string, pnl: number }[]
    investmentList: Investment[],
    weeklyData: {week: string, pnl: number}[]
    monthlyData: {monthYear: string, pnl: number}[]
}

export interface Investment {
    id: number
    instrument: string
    investedAmount: number
    investmentDate: string
    userId: string
}
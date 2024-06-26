export default interface TradeFilters {
    showHoliday: boolean,
    showNoTradingDay: boolean,
    showWeekend: boolean,
    instrumentType: {
        stock: boolean,
        index: boolean,
        commodity: boolean,
    },
    resultType: {
        targetOrPartialTarget: boolean
        SLorPartialSL: boolean
        CTC: boolean
    }
}
export default interface Trade {
    id: number;
    day: number;
    dateTime: Date;
    noTradingDay: boolean;
    isHoliday: boolean;
    instrumentType: string;
    instrumentName: string;
    setupName: string;
    remarks: string;
    riskToReward: number;
    riskToRewardOnPremium: number;
    pnl: number;
    isWeekend: boolean;
    imagePaths: Array<string>;
    resultType: string
}
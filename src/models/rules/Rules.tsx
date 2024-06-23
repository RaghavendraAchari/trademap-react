export default interface Rule{
    content: string
    id:number
    userId: string
    dateTime: string
    lastUpdatedTime: string
    ruleType: "INTRADAY" | "SWING"
}
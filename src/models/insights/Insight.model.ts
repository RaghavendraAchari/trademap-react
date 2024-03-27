import InsightType from "./InsightType";

export default interface Insight {
    id: number,
    title: string,
    createdDateTime: string,
    lastUpdatedDateTime: string | null,
    content: string,
    insightType: InsightType
}
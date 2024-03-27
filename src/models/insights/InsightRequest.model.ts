import InsightType from "./InsightType";

export default interface InsightRequest {
    title: string,
    content: string,
    insightType: InsightType
}
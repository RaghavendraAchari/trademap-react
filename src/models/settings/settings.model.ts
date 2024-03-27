export default interface Settings {
    id: number | null,
    trackingDate: string,
    maxTradesLimit: number,
    warnWhenMaxLimitReached: boolean
    disableButton: boolean
}
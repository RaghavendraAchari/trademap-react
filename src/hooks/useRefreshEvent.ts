
export const REFRESH_EVENT = "refresh";

const event = new Event(REFRESH_EVENT);

export default function useRefreshEvent() {
    return {
        refreshEvent: REFRESH_EVENT,
        refreshComponents: () => {
            document.dispatchEvent(event)
            console.log("Refreshing Page");

        }
    }
}
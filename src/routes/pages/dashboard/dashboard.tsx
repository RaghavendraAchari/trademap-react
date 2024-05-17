import TradesDetails from "@/components/dashboard/TradeDetails";
import PendingDays from "@/components/dashboard/PendingDetails";
import { useState } from "react";
import backendUrls from "@/constants/backendUrls";
import useFetch from "@/hooks/useFetch";
import { getDateInISOAsLocalDate } from "@/lib/dateUtils";
import Trade from "@/models/trade/Trade";
import useCurrentDate from "@/hooks/useCurrentTime";
import DisplayHeader from "@/components/commons/DisplayHeader";

export default function DashBoard() {
    const [forDate, setForDate] = useState<Date>(new Date())

    let url = "";

    if (forDate === null || forDate === undefined) {
        url = backendUrls.tradeDetails.allTrades + "/today"
    } else {
        url = backendUrls.tradeDetails.forDate + "?date=" + getDateInISOAsLocalDate(forDate).substring(0, 10);
    }

    const { data: trades, error: tradeError, loading: tradeLoading, refresh: refreshTrades } = useFetch<Trade[]>(url);
    const { data: pendingDaysList, refresh: refreshPendingDays, loading: pendingDaysLoading, error: pendingDaysError } = useFetch<string[]>(backendUrls.tradeDetails.pendingDays);

    const onDataSubmit = async () => {
        console.log("Data submited");

        await refreshTrades()
        await refreshPendingDays()
    }

    const { dateAsString } = useCurrentDate()

    return <>
        <DisplayHeader title="Dashboard" description={"Date and Time: " + dateAsString} className='flex-none bg-background p-3' />
        <div className="md:flex md:flex-row md:grow md:max-h-full md:divide-x md:overflow-y-auto">
            <TradesDetails
                className='grow flex flex-col w-full max-h-full lg:w-[70%] bg-background md:px-0 md:py-3 overflow-y-auto'
                forDate={forDate}
                trades={trades}
                error={tradeError}
                loading={tradeLoading}
                setForDate={setForDate}
                onDataSubmit={onDataSubmit} />

            <PendingDays
                className="grow flex flex-col w-full lg:flex-grow lg:w-[30%] bg-background py-3"
                days={pendingDaysList}
                loading={pendingDaysLoading}
                error={pendingDaysError}
                setForDate={setForDate}
                forDate={forDate} />
        </div>
    </>
}
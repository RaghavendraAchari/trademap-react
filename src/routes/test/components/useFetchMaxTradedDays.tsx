import backendUrls from "@/constants/backendUrls";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function useFetchMaxTradedDays() {
    const [maxDay, setMaxDay] = useState()

    useEffect(() => {
        axios.get(backendUrls.tradeDetails.maxTradedDays)
            .then(res => {
                setMaxDay(res.data.days)
            })
            .catch((e: AxiosError) => {
                console.log(e);
            })
    }, [])

    return {
        maxDay
    }
}
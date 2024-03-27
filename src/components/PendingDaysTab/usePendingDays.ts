import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function usePendingDays() {
    const [pendingDates, setPendingDates] = useState<string[] | undefined | null>(undefined)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    const refresh = () => { fetchPendingDays() }

    function fetchPendingDays() {
        setLoading(true)

        axios.get<string[]>("http://localhost:8080/tradedetails/pendingDates")
            .then(res => {
                setPendingDates(res.data)
            }).catch((err: AxiosError) => {
                setPendingDates(null)
                setError(err.message)
            }).finally(() => setLoading(false))
    }

    useEffect(() => {
        console.log("pending days useEffect Called");

        fetchPendingDays();
    }, [])

    return {
        pendingDates,
        error,
        loading,
        refresh
    }
}
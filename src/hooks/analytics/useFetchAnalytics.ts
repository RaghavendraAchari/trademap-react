import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Analytics from "@/models/analytics/analytics";
import http from "../axiosConfig";


export default function useFetchAnalytics(url: string) {
    const [data, setData] = useState<Analytics | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = () => {
        setLoading(true)

        http.get(url)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err: AxiosError) => { setError(err.message); setLoading(false) })
    }

    const refresh = () => {
        fetchData();
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        error,
        loading,
        refresh
    }
}
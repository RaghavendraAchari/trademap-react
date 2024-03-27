import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Settings from "@/models/settings/settings.model";
import http from "../axiosConfig";



export default function useFetchSettings(url: string) {
    const [data, setData] = useState<Settings | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)
    const [notFound, setNotFound] = useState<boolean | null>(false)

    const refresh = () => {
        fetchData(url)
    }

    function fetchData(url: string) {
        setLoading(true)

        http.get(url)
            .then(res => {
                setData(res.data)
                setError(null)
                setNotFound(false)
            })
            .catch((e: AxiosError) => {
                if (e.status === 404) {
                    setNotFound(true)
                } else if (e.status === 500) {
                    setError("Internal server error")
                } else {
                    setError("Network Timeout")
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData(url);
    }, [url])

    return {
        data,
        error,
        loading,
        refresh,
        notFound
    }
}
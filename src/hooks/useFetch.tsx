import http from "./axiosConfig";
import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    const refresh = async () => {
        await fetchData(url)
    }

    async function fetchData(url: string) {
        setLoading(true)

        try {
            const response = await http.get<T>(url);

            if (error !== null) setError(null)

            setData(response.data)
        } catch (e: any) {
            setError(e.name)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url])

    return {
        data,
        error,
        loading,
        refresh
    }
}
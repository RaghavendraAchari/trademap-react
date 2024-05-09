import { AxiosError } from "axios";
import http from "../axiosConfig";
import { useEffect, useState } from "react";

export interface DailyNote {
    id: number;
    date: string;
    userId: string;
    filePath: string;
}

export default function useFetchTodaysNote(url: string) {
    const [data, setData] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    const refresh = async () => {
        await fetchData(url)
    }

    async function fetchData(url: string) {
        setLoading(true)

        try {
            const response = await http.get<string>(url);

            if (error !== null) setError(null)

            setData(response.data)
        } catch (e) {
            const error = e as AxiosError

            if (error.response?.status === 404) {
                setData(null);
                setError(null);
                return
            } else
                setError(error.message)
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
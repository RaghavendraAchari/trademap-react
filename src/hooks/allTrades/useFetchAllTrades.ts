
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Trade from "@/models/trade/Trade";
import { SORT } from "@/constants/SortType";
import TradeFilters from "@/types/filters";
import { useNavigate } from "react-router-dom";
import http from "../axiosConfig";


export default function useFetchAllTrades(url: string, sort?: SORT, filters?: TradeFilters) {
    const [list, setList] = useState<Trade[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchData = () => {
        setLoading(true)
        const instrumentType: string[] = []

        filters?.instrumentType.stock ? instrumentType.push("STOCK") : null;
        filters?.instrumentType.index ? instrumentType.push("INDEX") : null;
        filters?.instrumentType.commodity ? instrumentType.push("COMMODITY") : null; 

        http.get(url, {
            params: {
                sort: sort,
                showHoliday: filters?.showHoliday,
                showNoTradingDay: filters?.showNoTradingDay,
                showWeekend: filters?.showWeekend,
                // instrumentType
            },
            // paramsSerializer: serializer

        })
            .then(res => {
                setList(res.data)
                setLoading(false)
            })
            .catch((err: AxiosError) => { setError(err.message); setLoading(false) })
    }

    const refresh = () => {
        fetchData();
    }

    useEffect(() => {
        if (sessionStorage.getItem("token") === null)
            return navigate("/login")

        fetchData()
    }, [sort, filters])

    return {
        data: list,
        error: error,
        loading,
        refresh
    }
}



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

        http.get(url, {
            params: {
                sort: sort,
                showHoliday: filters?.showHoliday,
                showNoTradingDay: filters?.showNoTradingDay,
                showWeekend: filters?.showWeekend,
                showStocks: filters?.instrumentType?.stock,
                showFno: filters?.instrumentType?.index,
                showCommodity: filters?.instrumentType?.commodity,
                showTargetOrPartialTarget: filters?.resultType?.targetOrPartialTarget,
                showSLorPartialSL: filters?.resultType?.SLorPartialSL,
                showCTC: filters?.resultType?.CTC,
            },
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

        fetchData()
    }, [sort, filters])

    return {
        data: list,
        error: error,
        loading,
        refresh
    }
}



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

    const generateParams = () => {
        const params: any = {
            sort: sort,
        };

        if(filters?.showHoliday) params['showHoliday'] = true
        if(filters?.showNoTradingDay) params['showNoTradingDay'] = true
        if(filters?.showWeekend) params['showWeekend'] = true

        if(filters?.instrumentType?.stock) params['showStocks'] = true
        if(filters?.instrumentType.index) params['showFno'] = true
        if(filters?.instrumentType.commodity) params['showCommodity'] = true

        if(filters?.resultType?.targetOrPartialTarget) params['showTargetOrPartialTarget'] = true
        if(filters?.resultType?.SLorPartialSL) params['showSLorPartialSL'] = true
        if(filters?.resultType.CTC) params['showCTC'] = true

        console.log(params);
        
        return params;
    }

    const fetchData = () => {
        setLoading(true) 

        http.get(url, {
            params: generateParams()
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


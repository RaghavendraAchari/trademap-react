
import { useEffect, useState } from "react";
import axios, { AxiosError, CustomParamsSerializer, ParamsSerializerOptions } from "axios";
import backendUrls from "@/constants/backendUrls";
import Trade from "@/models/trade/Trade";
import { SORT } from "@/constants/SortType";
import TradeFilters from "@/types/filters";


export default function useFetchAllTrades(url: string, sort?: SORT, filters?: TradeFilters) {
    const [list, setList] = useState<Trade[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const serializer: CustomParamsSerializer = (params) => {
        const newParams: any = {};

        for (const key in params) {
            if (Array.isArray(params[key])) {
                newParams[key] = params[key].join(',');
            } else {
                newParams[key] = params[key];
            }
        }
        console.log({ newParams });

        return newParams;
    };

    const fetchData = () => {
        setLoading(true)
        const instrumentType: string[] = []

        filters?.instrumentType.stock ? instrumentType.push("STOCK") : null;
        filters?.instrumentType.index ? instrumentType.push("INDEX") : null;
        filters?.instrumentType.commodity ? instrumentType.push("COMMODITY") : null; 

        axios.get(url, {
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
        fetchData()
    }, [sort, filters])

    return {
        data: list,
        error: error,
        loading,
        refresh
    }
}


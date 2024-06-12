import { useEffect, useState } from "react";
import DisplayHeader from "@/components/commons/DisplayHeader";
import Watchlist from "./watchlist";
import Timeline from "./timeline";
import Positions from "./positions";
import useFetch from "@/hooks/useFetch";
import backendUrls from "@/constants/backendUrls";
import Loading from "@/components/loading/loading";
import http from "@/hooks/axiosConfig";


export type Stock = {
    instrumentName: string,
    createdDate: string
    userId: string
    id: number,
}

export default function Swing() {

    const addNewStock = (stockName: string) => {
        //call api
        http.post(backendUrls.watchlist, stockName, {
            headers: {
                "Content-Type": "text/plain"
            }
        })
        .then(res => {
            if(res.status === 200){
                watchlistRefresh();
            }
        })
        .catch(err => console.log(err))
        .finally(() => setNewStock(""))
        
    }

    const [timeline, setTimeline] = useState<EditorJS.OutputData>();
    const [newStock, setNewStock] = useState<string>("")
    const [selectedStock, setSelectedStock] = useState<Stock>()

    const {data:watchlist, loading: watchlistLoading, error: watchlistError, refresh: watchlistRefresh} = useFetch<Stock[]>(backendUrls.watchlist);
    
    // console.log(watchlist);
    
    return <>
        <DisplayHeader title="Swing Trade" description="Actively monitor and track short term trades." className='flex-none bg-background p-3' />
        <div className="md:grid md:grid-cols-[20%_50%_30%] divide-x h-full max-h-full overflow-y-auto">
            {(!watchlistLoading && watchlist && !watchlistError) ? <Watchlist setSelectedStock={setSelectedStock} selectedStock={selectedStock} addNewStock={addNewStock} stockList={watchlist} onDelete={(id: number) => {
                http.delete<boolean>(`${backendUrls.watchlist}/${id}`)
                .then( res => {
                    if(res.data === true)
                        watchlistRefresh();
                    
                })
                .catch(err => console.log(err))
            }}/> : <Loading />}

            <Timeline />

            <Positions />
        </div>
    </>
}
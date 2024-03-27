import backendUrls from "@/constants/backendUrls";
import axios, { AxiosError } from "axios";
import ResponseHandler from "./ResponseHandler";
import { useToast } from "@/components/ui/use-toast";


export function getPendingDates() {

}

export async function getAllTrades(pageNumber: number, pageSize: number) {
    try {
        let response = await axios.get(backendUrls.tradeDetails.allTrades, { params: { "page": pageNumber, "size": pageSize } })
        return response

    } catch (err) {
        throw new AxiosError()
    }

}

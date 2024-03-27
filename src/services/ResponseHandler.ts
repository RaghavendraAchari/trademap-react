
import { AxiosError, AxiosResponse } from "axios";

export default function ResponseHandler(res: AxiosResponse, toast: any) {
    const status = res.status.toString();

    if (status.startsWith("2"))
        return res.data
    else {
        if (status.startsWith("404")) {
            toast({
                title: "Data not found"
            })
        } else if (status.startsWith("5")) {
            toast({
                title: "Server error"
            })
        } else {
            toast({
                title: "Network Error"
            })
        }
        throw new AxiosError()
    }
}

import { FormEvent, useState } from "react"
import { Button } from "../ui/button"
import { appendTime, getDateInISOAsLocalDate } from "@/lib/dateUtils"
import axios, { AxiosError } from "axios"
import { useToast } from "../ui/use-toast"
import { Checkbox } from "../ui/checkbox"
import useRefreshEvent from "../../hooks/useRefreshEvent"
import Loader from "../commons/LoadingSpinner"
import { Textarea } from "../ui/textarea"
import http from "@/hooks/axiosConfig"
import backendUrls from "@/constants/backendUrls"


interface Props {
    forDate: Date,
    onDataSubmit: () => void
}

interface Data {
    isHoliday: boolean
    isWeekend: boolean
    noTradingDay: boolean
    dateTime: string
    remarks: string
}

type State = "NoTradingDay" | "Weekend" | "Holiday" | null;

const classNames = {
    label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
}

export default function NoTradingDayForm({ forDate, onDataSubmit }: Props) {
    const [state, setState] = useState<State>(null)
    const { toast } = useToast()
    const [submiting, setSubmitig] = useState(false);
    const [remarks, setRemarks] = useState<string>("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (state === null) return;

        const postData: Data = {
            isHoliday: state === "Holiday",
            isWeekend: state === "Weekend",
            noTradingDay: state === "NoTradingDay",
            dateTime: appendTime(forDate),
            remarks: remarks
        }
        setSubmitig(true)

        http.post(backendUrls.tradeDetails.noTradingDay, postData)
            .then(() => {
                let title;

                switch (state) {
                    case "Holiday":
                        title = "Marked as holiday."
                        break
                    case "NoTradingDay":
                        title = "Marked as no trading day."
                        break
                    case "Weekend":
                        title = "Marked as weekend."
                        break
                }

                toast({
                    title: title,
                    description: "Data is sent to server successfully."
                })

                setSubmitig(false);
                setRemarks("")
                setState(null)
                onDataSubmit();

            })
            .catch((err: AxiosError) => {
                toast({ title: "Network Error", description: err.message })
            });
    }

    return <>
        <form className="mt-4 space-y-1 flex flex-col md:flex-row md:space-y-0 p-2 md:mx-2 bg-main-extrafade rounded border md:justify-between md:items-center" onSubmit={(e) => { handleSubmit(e) }}>
        <div className="items-top flex space-x-2">
                <Checkbox className="bg-white" name="noTradingDay" id="noTradingDay" checked={state === "NoTradingDay"} onClick={() => {
                setState(prev => prev === "NoTradingDay" ? null : "NoTradingDay")
            }} />
            <label
                htmlFor="noTradingDay"
                className={classNames.label}
            >
                Mark as no trading day
            </label>
        </div>
        <div className="items-top flex space-x-2">
                <Checkbox className="bg-white" name="isHoliday" id="isHoliday" checked={state === "Holiday"} onClick={() => {
                setState(prev => prev === "Holiday" ? null : "Holiday")

            }} />
            <label
                htmlFor="isHoliday"
                className={classNames.label}
            >
                Mark as holiday
            </label>
        </div>
        <div className="items-top flex space-x-2">
                <Checkbox className="bg-white" name="isWeekend" id="isWeekend" checked={state === "Weekend"} onClick={() => {
                setState(prev => prev === "Weekend" ? null : "Weekend")
            }} />
            <label
                htmlFor="isWeekend"
                className={classNames.label}
            >
                Mark as weekend
            </label>
        </div>
        <Button className="mr-0 self-end" type="submit" variant={"outline"}>{submiting ? <Loader loading={submiting} /> : "Update"}</Button>
    </form>
        {
            state === "Holiday" || state === "NoTradingDay"
                ? <div className="pt-2">
                    <Textarea className="" onChange={(e) => setRemarks(e.target.value)} value={remarks} rows={3} placeholder="Remarks if any..."></Textarea>
                </div>
                : null
        }
    </>
}
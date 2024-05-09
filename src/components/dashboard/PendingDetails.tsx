import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction } from "react";

import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import Loading from "@/components/loading/loading";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BadgeCheckIcon, Terminal } from "lucide-react";


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    days: string[] | null
    loading: boolean
    error: string | null
    setForDate: Dispatch<SetStateAction<Date>>;
    forDate: Date
}

export default function PendingDays({ days, error, loading, setForDate, forDate, className, ...props }: Props) {

    return <div className={cn(className)} {...props}>
        <div className="flex-none flex flex-row justify-between align-center mb-2 bg-transparent px-3">
            <h3 className="text-lg font-bold bg-transparent">Pending Days:</h3>
        </div>

        <Separator />
        {loading ? <Loading /> : null}

        <div className="md:grow overflow-y-auto md:max-h-[100%] mb-2 p-1 px-3">
            {
                !loading && days
                    ? <>
                    {
                            days.length === 0
                                ? <div className="px-0">
                                    <Alert variant={"default"} className="mt-1 text-muted-foreground">
                                        <BadgeCheckIcon opacity={0.7} />
                                        <AlertTitle>No pending days</AlertTitle>
                                        <AlertDescription>You don't have any pending days</AlertDescription>
                                    </Alert>
                                </div>
                                : <div className="grow overflow-y-auto max-h-[100%] mb-2 p-1 px-3">
                                    {days?.map((date, index) => {
                                        return <Card className="my-2 hover:shadow" key={index} >
                                            <CardHeader className={"flex flex-row justify-between align-center px-4 py-2 space-y-0 " + ((forDate.toDateString() === new Date(date).toDateString()) ? "bg-main-extrafade" : "")}>
                                                <p className="text-sm font-medium self-center">{format(new Date(date), "eee, dd-MMM-yyyy")} </p>
                                                <Button className="w-fit text-sm m-0" size={"sm"} variant={"outline"} onClick={() => setForDate(new Date(date))}>Fill now</Button>
                                            </CardHeader>
                                        </Card>
                                    })}
                                </div> 
                    }
                </>
                    : null
            }
            {
                !loading && error && <PendingDaysError />
            }
        </div>
    </div>
}

function PendingDaysError() {
    return <Alert className="" variant={"destructive"}>
        <Terminal size={"16px"} />
        <AlertTitle>Oops..</AlertTitle>
        <AlertDescription>Something went wrong while petching the pending days.</AlertDescription>
    </Alert>
}
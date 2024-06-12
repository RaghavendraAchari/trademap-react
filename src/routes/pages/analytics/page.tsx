import TotalInvestment from "@/components/analytics/totalInvestment";
import DaysSegregation from "@/components/analytics/daysSegregation";
import TradedSegmentsDetails from "@/components/analytics/tradedSegmentsDetails";
import PnlAnalytics from "@/components/analytics/pnlAnalytics";
import useFetchAnalytics from "@/hooks/analytics/useFetchAnalytics";
import backendUrls from "@/constants/backendUrls";
import Loading from "@/components/loading/loading";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TerminalIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDatum, ResponsiveCalendar, useColorScale } from '@nivo/calendar'

import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { compareAsc, compareDesc, format, isAfter } from "date-fns";
import DisplayHeader from "@/components/commons/DisplayHeader";
import Analytics from "@/models/analytics/analytics";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { PnLCharts } from "./pnlCharts";

export default function AnalyticsPage() {
    const { data, error, loading } = useFetchAnalytics(backendUrls.analytics);

    return (
        <>
            <DisplayHeader title="Analytics" description="Summary of your trading journey." className='flex-none bg-background p-3' />
        <div className='page p-3 space-y-2 overflow-y-scroll w-full'>

            {
                (data && !loading && error === null)
                    ? <>
                        <TotalInvestment amount={data.totalInvestment} list={data.investmentList} />

                        {/* Total number of days */}
                        <div>
                            <DaysSegregation data={data} />
                        </div>

                        {/* Traded days */}
                        <div className="">
                            <TradedSegmentsDetails data={data} />
                        </div>

                        {/* pnl related */}
                        <div>
                            <PnlAnalytics data={data} />
                        </div>
                        
                        <PnLCharts className="w-full" data={data} />


                    </>
                    : null
            }
            {
                loading ? <Loading /> : null
            }
            {
                error
                    ? <Alert>
                        <TerminalIcon />
                        <AlertTitle >Error</AlertTitle>
                    </Alert>
                    : null
            }

        </div>
        </>
    )
}

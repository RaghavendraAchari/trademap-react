import TotalInvestment from "@/components/analytics/totalInvestment";
import DaysSegregation from "@/components/analytics/daysSegregation";
import TradedSegmentsDetails from "@/components/analytics/tradedSegmentsDetails";
import PnlAnalytics from "@/components/analytics/pnlAnalytics";
import useFetchAnalytics from "@/hooks/analytics/useFetchAnalytics";
import backendUrls from "@/constants/backendUrls";
import Loading from "@/components/loading/loading";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { TerminalIcon } from "lucide-react";

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

export default function Analytics() {
    const { data, error, loading } = useFetchAnalytics(backendUrls.analytics);

    return (
        <div className='page p-3 space-y-2 overflow-y-scroll'>

            {
                (data && !loading && error === null)
                    ? <>
                        <TotalInvestment amount={data.totalInvestment} />

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
                        <div>
                            <h3 className="prose p-3 font-semibold text-xl">Daily P&L chart:</h3>

                            {
                                data.dateWiseProfit ? <div className="h-[500px] w-full xl:w-[1000px] "><ResponsiveContainer className="py-2">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={data.dateWiseProfit}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="date" name="Date" className="text-xs " />
                                        <YAxis dataKey="pnl" name="Profit & Loss (P&L)" className="text-sm " />

                                        <Tooltip wrapperClassName="rounded-md shadow-lg text-sm text-muted-foreground font-medium border border-slate-100" />

                                        {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                                        <ReferenceLine y={0} stroke="#000" />

                                        <Brush dataKey="date" height={30} stroke="#8884d8" className="text-xs text-muted-foreground " />

                                        <Bar dataKey="pnl" name="Profit & Loss (P&L)">
                                            {data.dateWiseProfit.map(it => {
                                                if (it.pnl >= 0)
                                                    return <Cell key={it.date} fill="#429242c4" className="rounded-lg" />
                                                else
                                                    return <Cell key={it.date} fill="#ce3f3fc4" className="rounded-lg" />
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer></div>
                                    :
                                    <Alert variant={"destructive"} className="w-full">
                                        <AlertTitle>Chart data is not available</AlertTitle>
                                    </Alert>
                            }

                        </div>


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
    )
}






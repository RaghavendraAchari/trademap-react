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
import { format } from "date-fns";
import DisplayHeader from "@/components/commons/DisplayHeader";

export default function Analytics() {
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
                        <div className="w-full">
                            <h3 className="p-3 font-semibold text-xl border-b w-full">Daily P&L chart:</h3>
                            <Tabs defaultValue="calender" className="">
                                <TabsList className="p-2 m-2">
                                    <TabsTrigger value="calender">Calender chart</TabsTrigger>
                                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                                </TabsList>
                                <TabsContent value="bar">
                                    {
                                        data.dateWiseProfit ? <div className="h-[500px] w-full xl:w-[1000px] mx-auto">
                                            <ResponsiveContainer className="py-2" >
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

                                                    <XAxis dataKey={value => format(new Date(value.date), "d MMM")} name="Date" className="text-xs" />
                                                    <YAxis dataKey="pnl" name="Profit & Loss (P&L)" className="text-sm " />

                                                    <Tooltip wrapperClassName="rounded-md shadow-lg text-sm text-muted-foreground font-medium border border-slate-100" />

                                                    {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                                                    <ReferenceLine y={0} stroke="#000" />

                                                    {/* <Brush dataKey="date" height={30} stroke="#8884d8" className="text-xs text-muted-foreground " /> */}

                                                    <Bar dataKey="pnl" name="Profit & Loss (P&L)">
                                                        {data.dateWiseProfit.map(it => {
                                                            if (it.pnl >= 0)
                                                                return <Cell key={it.date} fill="#00ac02" className="rounded-lg" />
                                                            else
                                                                return <Cell key={it.date} fill="#c20000" className="rounded-lg" />
                                                        })}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer></div>
                                            :
                                            <Alert variant={"destructive"} className="w-full">
                                                <AlertTitle>Chart data is not available</AlertTitle>
                                            </Alert>
                                    }
                                </TabsContent>
                                <TabsContent value="calender" className="h-[500px]">
                                    <ResponsiveCalendar
                                        maxValue={Math.round(Math.max(Math.abs(data.maxLossInADay), Math.abs(data.maxProfitInADay)))}
                                        minValue={-Math.round(Math.max(Math.abs(data.maxLossInADay), Math.abs(data.maxProfitInADay)))}
                                        data={data.dateWiseProfit.map<CalendarDatum>(it => {
                                            return {
                                                value: it.pnl,
                                                day: it.date
                                            }
                                        })}
                                        from="2023-04-01"
                                        to="2025-03-31"
                                        emptyColor="#eeeeee"
                                        colors={['#ff0000', '#ff5d5d', '#fa9a9a', '#98ff99', '#3eff40', '#00e703']}
                                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                                        yearSpacing={50}
                                        monthSpacing={20}
                                        monthBorderColor="#ffffff"
                                        dayBorderWidth={2}
                                        dayBorderColor="#ffffff"
                                        legends={[
                                            {
                                                anchor: 'bottom-right',
                                                direction: 'row',
                                                translateY: 36,
                                                itemCount: 4,
                                                itemWidth: 42,
                                                itemHeight: 36,
                                                itemsSpacing: 14,
                                                itemDirection: 'right-to-left'
                                            }
                                        ]}

                                    />
                                </TabsContent>
                            </Tabs>



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
        </>
    )
}






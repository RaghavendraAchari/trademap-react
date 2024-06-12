import { Alert, AlertTitle } from "@/components/ui/alert";
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
import { compareDesc, format } from "date-fns";
import Analytics from "@/models/analytics/analytics";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement>{
    data: Analytics
}

export function PnLCharts({className, data }:Props){
    return <div className={cn(className)}>
        <h3 className="p-3 font-semibold text-xl border-b w-full">P&L charts:</h3>
        <Tabs defaultValue="calender" className="">
            <TabsList className="p-2 m-2">
                <TabsTrigger value="calender">Calender chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="bar">
                {
                    data.dateWiseProfit && data.weeklyData && data.monthlyData
                    ? <div className="h-[500px] w-full px-2 mx-auto ">
                        <Tabs defaultValue="daily">
                            <TabsList>
                                <TabsTrigger value="daily">Daily</TabsTrigger>
                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            </TabsList>
                            <TabsContent value="daily">
                                <div className="h-[500px] w-full xl:w-full mx-auto ">
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
                                        </ResponsiveContainer>
                                </div>
                            </TabsContent>
                            <TabsContent value="weekly">
                                <div className="h-[500px] w-full xl:w-full mx-auto ">
                                    <ResponsiveContainer className="py-2" >
                                    <BarChart

                                        width={500}
                                        height={300}
                                        data={data.weeklyData.sort((a,b) => {
                                            const aDate = new Date(a.week.split("->")[0])
                                            const bDate = new Date(b.week.split("->")[0])

                                            return compareDesc(aDate, bDate)
                                        })}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}

                                    >
                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="week" name="Week" className="text-xs" />
                                        <YAxis dataKey="pnl" name="Profit & Loss (P&L)" className="text-sm " />

                                        <Tooltip wrapperClassName="rounded-md shadow-lg text-sm text-muted-foreground font-medium border border-slate-100" />

                                        {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                                        <ReferenceLine y={0} stroke="#000" />

                                        {/* <Brush dataKey="date" height={30} stroke="#8884d8" className="text-xs text-muted-foreground " /> */}

                                        <Bar dataKey="pnl" name="Profit & Loss (P&L)">
                                            {data.weeklyData.sort((a,b) => {
                                            const aDate = new Date(a.week.split("->")[0])
                                            const bDate = new Date(b.week.split("->")[0])

                                            return compareDesc(aDate, bDate)
                                        }).map(it => {
                                                if (it.pnl >= 0)
                                                    return <Cell key={it.week} fill="#00ac02" className="rounded-lg" />
                                                else
                                                    return <Cell key={it.week} fill="#c20000" className="rounded-lg" />
                                            })}
                                        </Bar>
                                    </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </TabsContent>
                            <TabsContent value="monthly">
                                <div className="h-[500px] w-full xl:w-full mx-auto ">
                                <ResponsiveContainer className="py-2" >
                                    <BarChart

                                        width={500}
                                        height={300}
                                        data={data.monthlyData.sort((a,b) => {
                                            const aDate = new Date(parseInt(a.monthYear.split("-")[1]), parseInt(a.monthYear.split("-")[0]))
                                            const bDate = new Date(parseInt(b.monthYear.split("-")[1]), parseInt(b.monthYear.split("-")[0]))

                                            return compareDesc(aDate, bDate)
                                        })}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}

                                    >
                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="monthYear" name="Month" className="text-xs" />
                                        <YAxis dataKey="pnl" name="Profit & Loss (P&L)" className="text-sm " />

                                        <Tooltip wrapperClassName="rounded-md shadow-lg text-sm text-muted-foreground font-medium border border-slate-100" />

                                        {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                                        <ReferenceLine y={0} stroke="#000" />

                                        {/* <Brush dataKey="date" height={30} stroke="#8884d8" className="text-xs text-muted-foreground " /> */}

                                        <Bar dataKey="pnl" name="Profit & Loss (P&L)">
                                            {data.monthlyData.sort((a,b) => {
                                            const aDate = new Date(parseInt(a.monthYear.split("-")[1]), parseInt(a.monthYear.split("-")[0]))
                                            const bDate = new Date(parseInt(b.monthYear.split("-")[1]), parseInt(b.monthYear.split("-")[0]))

                                            return compareDesc(aDate, bDate)
                                        }).map(it => {
                                                if (it.pnl >= 0)
                                                    return <Cell key={it.monthYear} fill="#00ac02" className="rounded-lg" />
                                                else
                                                    return <Cell key={it.monthYear} fill="#c20000" className="rounded-lg" />
                                            })}
                                        </Bar>
                                    </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </TabsContent>
                        </Tabs>
                        
                        </div>
                    :
                        <Alert variant={"destructive"} className="w-full">
                            <AlertTitle>Chart data is not available</AlertTitle>
                        </Alert>
                }
            </TabsContent>
            <TabsContent value="calender" className="h-[500px] w-[1300px] flex flex-row justify-center">
                <ResponsiveCalendar 
                    maxValue={Math.round(Math.max(Math.abs(data.maxLossInADay), Math.abs(data.maxProfitInADay)))}
                    minValue={-Math.round(Math.max(Math.abs(data.maxLossInADay), Math.abs(data.maxProfitInADay)))}
                    data={data.dateWiseProfit.map<CalendarDatum>(it => {
                        return {
                            value: it.pnl,
                            day: it.date
                        }
                    })}
                    from="2024"
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
    </ div>
}


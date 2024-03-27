import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Analytics from "@/models/analytics/analytics";

const cardStyle = "border-2 w-full hover:bg-slate-50 shadow-none cursor-pointer";
const cardHeaderStyle = "text-xl"
const cardValuesStyle = "text-lg font-semibold"


export default function DaysSegregation({ data: { totalDays, totalHolidays, totalWeekends, totalNoTradingDays, totalTradedDays } }: { data: Analytics }) {
    return <Card className="mt-10">
        <CardHeader className="" >
            <CardTitle className="flex flex-row justify-between items-center">
                <span>Total days</span>
                <span>{totalDays}</span>
            </CardTitle>
            <CardDescription>The total number of days spent in your stock market journey</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between md:space-x-5 pt-6">
                <Card className={cardStyle + " border-green-100 bg-green-50"}>
                    <CardHeader >
                        <CardTitle className={cardHeaderStyle}>Tradings days</CardTitle>
                        <CardDescription className={cardValuesStyle}>{totalTradedDays}</CardDescription>
                    </CardHeader>
                </Card>
                <Card className={cardStyle + " border-red-100 bg-red-50"}>
                    <CardHeader >
                        <CardTitle className={cardHeaderStyle}>Weekends</CardTitle>
                        <CardDescription className={cardValuesStyle}>{totalWeekends}</CardDescription>
                    </CardHeader>
                </Card>
                <Card className={cardStyle + " border-purple-100 bg-purple-50"}>
                    <CardHeader >
                        <CardTitle className={cardHeaderStyle}>No trading days</CardTitle>
                        <CardDescription className={cardValuesStyle}>{totalNoTradingDays}</CardDescription>
                    </CardHeader>
                </Card>
                <Card className={cardStyle + " border-lime-100 bg-lime-50"}>
                    <CardHeader >
                        <CardTitle className={cardHeaderStyle}>Holidays</CardTitle>
                        <CardDescription className={cardValuesStyle}>{totalHolidays}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </CardContent>
    </Card>
}
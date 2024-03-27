import useCurrentDate from "../../hooks/useCurrentTime"
import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { useLocation } from "react-router-dom"

interface Props extends HTMLAttributes<HTMLDivElement> {

}

export default function DisplayHeader({ className, ...props }: Props) {
    const { dateAsString } = useCurrentDate()
    const pathname = useLocation().pathname;

    let title = null;
    let description = null;

    switch (pathname) {
        case "/":
            title = 'Dashboard'
            description = "Date and Time: " + dateAsString
            break
        case "/home":
            title = 'Dashboard'
            description = "Date and Time: " + dateAsString
            break
        case "/home/allTrades/":
            title = 'All Trades'
            description = "All the trades that you have taken till now."
            break
        case "/home/notes/":
            title = 'Personal Notes'
            description = "All the things that you want to remember in your trading journey."
            break
        case "/home/insights/":
            title = 'Insights'
            description = "Includes all the learning and observations from the trade history."
            break;
        case "/home/analytics/":
            title = 'Analytics'
            description = "Summary of your trading journey."
            break;
        case "/home/test/":
            title = 'Test'
            description = "Test app components here."
            break;
        default:
            title = 'Dashboard'
            description = "Date and Time: " + dateAsString
    }

    return <div className={cn(className)} {...props}>
        <h1 className='text-3xl font-extrabold opacity-80'>{title}</h1>
        <p className="font-medium pt-2" suppressHydrationWarning>{description}</p>
    </div>
}
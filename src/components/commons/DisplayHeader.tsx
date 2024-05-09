import useCurrentDate from "../../hooks/useCurrentTime"
import { HTMLAttributes, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "react-router-dom"
import { differenceInMinutes, differenceInSeconds } from "date-fns"



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
        case "/home/swing/":
            title = 'Swing Trade'
            description = "Actively monitor and track short term trades."
            break;
        case "/home/test/":
            title = 'Test'
            description = "Test app components here."
            break;
        case "/home/allTrades/preview/":
            title = 'Trades Review'
            description = "Review your trades with details"
            break;
        case "/home/reviewdailynotes/":
            title = 'Daily Note Review'
            description = "Study the past charts for better understanding of the market"
            break;
        default:
            title = 'Dashboard'
            description = "Date and Time: " + dateAsString
    }

    return <div className={cn(className)} {...props}>
        <h1 className='text-3xl font-extrabold opacity-80'>{title}</h1>
        <p className="font-medium pt-2 flex justify-between" >{description} </p>
    </div>
}

// function RemainingTime() {
//     const [time, setTime] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         function setTimeDifference() {
//             if (!sessionStorage.getItem("startTime"))
//                 return setTime("login")

//             const endTime = new Date(parseInt(sessionStorage.getItem("startTime") as string));
//             const difference = differenceInMinutes(endTime, new Date());

//             if (difference <= 0) {
//                 sessionStorage.clear()

//                 navigate("/login")
//             }

//             setTime(difference.toString() + " minutes")
//         }

//         setTimeDifference();

//         const timer = setInterval(() => {
//             setTimeDifference()
//         }, 1000 * 60)

//         return () => {
//             clearInterval(timer)
//         }

//     }, [])

//     return <span className="text-xs">Remaining session time : {time}</span>;
// }
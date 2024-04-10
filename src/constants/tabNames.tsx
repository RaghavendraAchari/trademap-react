import { ReactElement } from "react";
import { HomeIcon, LibrarySquareIcon, LightbulbIcon, MessageSquareTextIcon, MicroscopeIcon, SquareArrowUpIcon } from "lucide-react"

interface TabDetails {
    url: string,
    type?: "INTRADAY" | "SWING" | undefined
    tabName: string,
    icon: ReactElement,
    subTabs?: TabDetails[] 
}

const tabs: TabDetails[] = [
    {
        url: "/home",
        type: "INTRADAY",
        tabName: "Dashboard",
        icon: <HomeIcon size={24} />,
    },
    {
        url: "/home/allTrades/",
        type: "INTRADAY",
        tabName: "All Trades",
        icon: <LibrarySquareIcon size={24} />

    },
    {
        url: "/home/swing/",
        type: "SWING",
        tabName: "Swing Trade",
        icon: <SquareArrowUpIcon size={24} />

    },
    {
        url: "/home/notes/",
        type: undefined,
        tabName: "Personal Notes",
        icon: <MessageSquareTextIcon size={24} />

    },
    {
        url: "/home/insights/",
        type: undefined,
        tabName: "Insights on setups",
        icon: <LightbulbIcon size={24} />

    },
    {
        url: "/home/analytics/",
        type: undefined,
        tabName: "Analytics",
        icon: <MicroscopeIcon size={24} />

    },
]

export default tabs;
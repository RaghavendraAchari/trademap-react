import { ReactElement } from "react";
import { HomeIcon, LibrarySquareIcon, LightbulbIcon, MessageSquareTextIcon, MicroscopeIcon } from "lucide-react"

interface TabDetails {
    url: string,
    tabName: string,
    icon: ReactElement,
    subTabs?: TabDetails[] 
}

const tabs: TabDetails[] = [
    {
        url: "/home",
        tabName: "Dashboard",
        icon: <HomeIcon size={24} />,
    },
    {
        url: "/home/allTrades/",
        tabName: "All Trades",
        icon: <LibrarySquareIcon size={24} />

    },
    {
        url: "/home/notes/",
        tabName: "Personal Notes",
        icon: <MessageSquareTextIcon size={24} />

    },
    {
        url: "/home/insights/",
        tabName: "Insights on setups",
        icon: <LightbulbIcon size={24} />

    },
    {
        url: "/home/analytics/",
        tabName: "Analytics",
        icon: <MicroscopeIcon size={24} />

    },
]

export default tabs;
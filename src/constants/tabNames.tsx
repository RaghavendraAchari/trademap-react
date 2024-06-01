import { ReactElement } from "react";
import { HomeIcon, LibrarySquareIcon, LightbulbIcon, LucidePencilRuler, MessageSquareTextIcon, MicroscopeIcon, PencilRulerIcon, SquareArrowUpIcon, ViewIcon } from "lucide-react"

interface TabDetails {
    url: string,
    type?: "INTRADAY" | "SWING" | "STUDY"
    tabName: string,
    icon: ReactElement,
    subTabs?: TabDetails[] 
}

const tabs: TabDetails[] = [
    {
        url: "/home",
        type: "INTRADAY",
        tabName: "Dashboard",
        icon: <HomeIcon size={24} className="text-main group-hover:animate-up group-[.selected]:animate-up " />,
    },
    {
        url: "/home/allTrades/",
        type: "INTRADAY",
        tabName: "All Trades",
        icon: <LibrarySquareIcon size={24} className="text-main  group-hover:animate-up group-[.selected]:animate-up" />

    },
    {
        url: "/home/rulebook",
        type: "INTRADAY",
        tabName: "Rule Book",
        icon: <LucidePencilRuler size={24} strokeWidth={1.6} className="text-main group-hover:animate-up group-[.selected]:animate-up " />,
    },
    {
        url: "/home/swing/",
        type: "SWING",
        tabName: "Swing Trade",
        icon: <SquareArrowUpIcon size={24} className="text-main group-hover:animate-up group-[.selected]:animate-up" />

    },
    {
        url: "/home/reviewdailynotes/",
        type: "STUDY",
        tabName: "Review daily notes",
        icon: <ViewIcon size={24} className="text-main group-hover:animate-up group-[.selected]:animate-up" />

    },
    {
        url: "/home/notes/",
        type: "STUDY",
        tabName: "Personal Notes",
        icon: <MessageSquareTextIcon size={24} className="text-main group-hover:animate-up group-[.selected]:animate-up" />

    },
    {
        url: "/home/insights/",
        type: "STUDY",
        tabName: "Insights on setups",
        icon: <LightbulbIcon size={24} className="text-main group-hover:animate-up group-[.selected]:animate-up" />

    },
    {
        url: "/home/analytics/",
        type: "STUDY",
        tabName: "Analytics",
        icon: <MicroscopeIcon size={24} className="text-main group-hover:animate-up group-[.selected]:animate-up" />

    },
]

export default tabs;
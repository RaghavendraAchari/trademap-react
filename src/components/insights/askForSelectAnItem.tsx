"use client"

import { LayoutList } from "lucide-react";

export default function AskForSelectAnItem() {
    return <div className="flex flex-col justify-between items-center">
        <LayoutList size={100} opacity={0.3} />
        <p className="w-full text-sm font-semibold opacity-60 text-center p-2">Select an item from the list to display the contents</p>
    </div>
}
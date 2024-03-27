"use client"
import { Edit } from "lucide-react";

export default function AskForEdit() {
    return <div className="mt-10 flex flex-col items-center justify-center w-full h-full">
        <Edit size={100} opacity={0.3} />
        <p className="w-full text-sm font-semibold opacity-60 text-center p-2">Edit the content and add details</p>
    </div>
}
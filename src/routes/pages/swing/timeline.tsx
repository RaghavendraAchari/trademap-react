import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Circle, CircleXIcon, FileImageIcon, ListEndIcon, SendIcon, Trash2Icon } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TimelineInput from "./components/timeineInput";
import TimelineCard from "./components/timelineCard";

export interface TimelineData{
    id: number
    type: "text" | "image"
    content: string
    imageUrl: string
    datetime: Date
}

export default function Timeline(){
    const [data, setData] = useState<TimelineData[]>([
        {
            id: 0,
            type: "image",
            imageUrl: "https://picsum.photos/id/45/100",
            content: "",
            datetime: new Date()
        },
        {
            id: 1,
            type: "text",
            imageUrl: "",
            content: "But the stock when the price closed above 347",
            datetime: new Date()
        },
        {
            id: 2,
            type: "image",
            imageUrl: "https://picsum.photos/id/16/300/100",
            content: "",
            datetime: new Date()
        },
        {
            id: 3,
            type: "image",
            imageUrl: "https://picsum.photos/id/23/300/100",
            content: "",
            datetime: new Date()
        },
        {
            id: 4,
            type: "text",
            imageUrl: "",
            content: "But the stock when the price closed above 347",
            datetime: new Date()
        },
        {
            id: 5,
            type: "image",
            imageUrl: "https://picsum.photos/id/16/300/100",
            content: "",
            datetime: new Date()
        },
        {
            id: 6,
            type: "image",
            imageUrl: "https://picsum.photos/id/23/300/100",
            content: "",
            datetime: new Date()
        },
        {
            id: 7,
            type: "text",
            imageUrl: "",
            content: "But the stock when the price closed above 347",
            datetime: new Date()
        }
    ])

    return <div className="max-h-full divide-y flex flex-col overflow-auto">
    <h3 className="px-3 py-3 bg-purple-100 flex-none flex flex-row items-center space-x-2"><ListEndIcon size={20} /> <span className=" font-semibold">Timeline</span></h3>
    <ResizablePanelGroup direction="vertical">
        <ResizablePanel  className="overflow-auto flex flex-col">
            <ScrollArea className=" py-2 max-h-full pr-3">
                {
                    data.map((it, index) => {
                        return <TimelineCard key={it.id} data={it} index={index} />
                    })
                }
            </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={11} minSize={11}>
            <TimelineInput onSendClick={(text, files) => {
                const obj: TimelineData = {
                    id: data.length,
                    content: text,
                    imageUrl: files ? URL.createObjectURL(files[0]) : "",
                    datetime: new Date(),
                    type: files ? "image" : "text"
                }

                setData(prev => {
                    return [...prev, obj]
                })
            }}/>
        </ResizablePanel>
    </ResizablePanelGroup>
</div>
}

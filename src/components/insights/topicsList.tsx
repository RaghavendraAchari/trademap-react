"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Insight from "../../models/insights/Insight.model";
import { BookOpenText, BookText } from "lucide-react";
import { Label } from "@radix-ui/react-label";

export default
    function TopicsList({ data, onItemClick, selectedItem }: { data: Insight[], onItemClick: (insight: Insight) => void, selectedItem?: Insight }) {
    return data.map(insight => <Card key={insight.id} className={"w-full hover:shadow cursor-pointer mb-1 " + (selectedItem?.id === insight.id ? "bg-slate-100" : "")} onClick={() => onItemClick(insight)}>
        <CardHeader className="p-3 font-semibold text-sm flex flex-row items-center space-y-0 space-x-1 cursor-pointer" >
            {insight.insightType === "INSIGHT" ? <BookText opacity={0.5} /> : <BookOpenText opacity={0.5} />}
            <Label className="cursor-pointer">{insight.title}</Label>
        </CardHeader>
    </Card>)
}


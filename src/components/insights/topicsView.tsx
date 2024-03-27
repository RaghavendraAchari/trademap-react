"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import backendUrls from "@/constants/backendUrls"
import { Dialog, DialogTrigger, DialogContent, DialogDescription } from "@/components/ui/dialog"
import axios from "axios"
import { PlusCircle, Terminal } from "lucide-react"
import { useState } from "react"
import Insight from "../../models/insights/Insight.model"
import InsightRequest from "../../models/insights/InsightRequest.model"
import InsightType from "../../models/insights/InsightType"
import TopicsList from "./topicsList"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function TopicsView({ data, onDataSubmit, onItemClick, selectedItem }: { data: Insight[] | null, onDataSubmit: () => void, onItemClick: (item: Insight) => void, selectedItem?: Insight }) {

    const [title, setTitle] = useState("")
    const [insightType, setInsightType] = useState<InsightType>("INSIGHT")
    const { toast } = useToast()

    let insights: Insight[] = []
    let caseStudies: Insight[] = []

    if (data !== null) {
        insights = data.filter(it => it.insightType === "INSIGHT")
        caseStudies = data.filter(it => it.insightType === "CASE_STUDY")
    }

    function onAdd() {
        const insight: InsightRequest = {
            title: title,
            content: "",
            insightType: insightType
        }

        axios.post(backendUrls.insights.allInsights, insight)
            .then(res => {
                toast({
                    title: "Insight added successfully."
                })
                onDataSubmit()
            })
    }

    return <div className="flex flex-col items-center space-y-2 h-full max-h-full overflow-y-auto">
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex space-x-2" variant={"outline"}> <PlusCircle /> <span>Add a topic or case study</span></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Add an insight / case study</DialogHeader>
                <DialogDescription>Insights are the observations that you have observerd in a trading setup and case studies are the longer observations which you have studied in-depth about a particular instrument</DialogDescription>
                <div className="flex flex-col space-y-2">
                    <div>
                        <RadioGroup defaultValue={insightType} onValueChange={(value) => setInsightType(value as InsightType)}>
                            <Label>Type: </Label>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="INSIGHT" id="INSIGHT"></RadioGroupItem>
                                <Label htmlFor="INSIGHT" className="cursor-pointer">Insight</Label>
                            </div>
                            <div className="flex items-center space-x-2 ">
                                <RadioGroupItem value="CASE_STUDY" id="CASE_STUDY"></RadioGroupItem>
                                <Label htmlFor="CASE_STUDY" className="cursor-pointer">Case Study</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label>Title :
                            <Input placeholder="Give a title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onAdd} value={"Add"}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <div className="w-full grow overflow-auto h-full space-y-1">
            {data === null ? <Alert variant={"default"}>
                <Terminal />
                <AlertTitle>No insights to show</AlertTitle>
                <AlertDescription>Add an insight first</AlertDescription>
            </Alert> : <div >
                <h3 className="p-2 font-semibold border-b mb-1">Setups</h3>
                    <TopicsList data={insights} onItemClick={onItemClick} selectedItem={selectedItem} />

                <h3 className="mt-10 p-2 font-semibold border-b mb-1">Case Studies</h3>
                    <TopicsList data={caseStudies} onItemClick={onItemClick} selectedItem={selectedItem} />
            </div>}

        </div>

    </div>
}
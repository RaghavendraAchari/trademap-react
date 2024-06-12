import DisplayHeader from "@/components/commons/DisplayHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import useFetch from "@/hooks/useFetch";
import { AnimatePresence, Reorder, motion, useDragControls, useMotionValue } from "framer-motion"
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface Rules{
    content: string
    id:number
    userId: string
    dateTime: string
    lastUpdatedTime: string
    ruleType: "INTRADAY" | "SWING"
}

export default function RuleBook(){

    const [intradayRules, setIntradayRules] = useState<string[]>(["rule 1",  "Rule 2"]);
    const [swingTradingRules, setSwingTradingRules] = useState<string[]>(["rule 1",  "Rule 2"]);

    const {data, error, loading, refresh} = useFetch<Rules[]>(backendUrls.rules.rules);

    const intradayRule = data?.find(it => it.ruleType === "INTRADAY");
    return <>
    <DisplayHeader 
        title="Rule book"   
        description="Rules to follow while trading" className='flex-none bg-background p-3' />
    
    <div className="w-full max-h-full h-full grow grid grid-cols-2 gap-0 divide-x overflow-auto">
        <DisplayRules rules={intradayRules} setRules={setIntradayRules} heading="Rules for intraday trtading: "/>
        <DisplayRules rules={swingTradingRules} setRules={setSwingTradingRules} heading="Rules for swing trading:" />
    </div>
    </>
}

function DisplayRules({heading, rules, setRules, }:{heading:string, rules: string[], setRules: Dispatch<SetStateAction<string[]>>}){
    const controls = useDragControls()
    const [newRule, setNewRule] = useState("");

    const handleOnAdd = async () => {
        console.log("Setting new rule : " , newRule);
        setRules(prev => {
            return [...prev, newRule]
        })

        setNewRule("")
    }
    const handleOnSave = async () => {
        if(newRule !== "")
            return;

    }
    
    return <div className=" h-full flex flex-col">
    <h2 className="bg-slate-100 p-3">{heading}</h2>
    <div className="grow p-3 flex flex-col justify-between h-full max-h-full">
    <Reorder.Group layout
        as="ul" 
        axis="y" 
        values={rules} 
        onReorder={setRules} 
        className="space-y-2">
        {rules.map((item) => (
            <AnimatePresence>
                <Reorder.Item 
                key={item} 
                initial={{ translateY: 20 }}
                animate={{ translateY: 0 }}
                exit={{ opacity: 0 }}
                
                value={item} className="w-full rounded p-1 flex flex-row justify-between group">
            {"->"} {item}
            <span
                className="hover:cursor-pointer flex-row flex space-x-2"
                onPointerDown={(e) => controls.start(e)}>
                    <Trash2Icon onClick={() => {setRules(prev => {
                        const filtered = prev.filter(it => it !== item)
                        return filtered
                    })}} size={20} className={"opacity-50 invisible group group-hover:visible hover:opacity-100"}/>
                <GripVerticalIcon size={20} />
            </span>
            </Reorder.Item>
            </AnimatePresence>
        ))}
    </Reorder.Group>
    
    <div className="p-2 flex flex-col space-y-2">
        <Input value={newRule} placeholder="Type your rule here.." type="text" onChange={(e) => setNewRule(e.target.value)}/>
        <div className="space-x-2">
            <Button className="w-20" size={"sm"} onClick={() => handleOnAdd()}>Add rule</Button>
            <Button className="w-36" size={"sm"} variant={"outline"} onClick={() => handleOnSave()}>Save and Update</Button>
        </div>
    </div>
    </div>
    
    </div>
}
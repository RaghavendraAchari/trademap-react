import DisplayHeader from "@/components/commons/DisplayHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import useFetch from "@/hooks/useFetch";
import { AnimatePresence, Reorder, motion, useDragControls, useMotionValue } from "framer-motion"
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import DisplayRules from "./displayRules";
import Rule from "@/models/rules/Rules";

export default function RuleBook(){

    const [intradayRules, setIntradayRules] = useState<string[]>(["rule 1",  "Rule 2"]);
    const [swingTradingRules, setSwingTradingRules] = useState<string[]>(["rule 1",  "Rule 2"]);

    const {data, error, loading, refresh} = useFetch<Rule[]>(backendUrls.rules.rules);

    const intradayRule = data?.find(it => it.ruleType === "INTRADAY");

    return <>
    <DisplayHeader 
        title="Rule book"   
        description="Rules to follow while trading" className='flex-none bg-background p-3' />
    
    <div className="w-full max-h-full h-full grow grid grid-cols-2 gap-0 divide-x overflow-auto">
        <DisplayRules ruleType="INTRADAY"  heading="Rules for intraday trading: "/>
        <DisplayRules ruleType="SWING"  heading="Rules for swing trading:" />
    </div>
    </>
}

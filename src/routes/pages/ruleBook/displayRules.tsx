import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import useFetch from "@/hooks/useFetch";
import Rule from "@/models/rules/Rules";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useState } from "react";

type RuleType = "INTRADAY" | "SWING"

interface Props extends HTMLAttributes<HTMLDivElement>{
    heading:string, 
    ruleType: RuleType
}

export default function DisplayRules({heading, ruleType}:Props){
    const {data, error, loading, refresh} = useFetch<Rule>(`${backendUrls.rules.rules}/${ruleType}`);
    const controls = useDragControls()

    const [rules, setRules] = useState<string[]>()
    const [newRule, setNewRule] = useState("");

    // console.log(rules);

    useEffect(() => {
        if(data){
            setRules(JSON.parse(data.content))
        }
    }, [data])
    
    const {toast} = useToast()

    const handleOnAdd = async () => {
        console.log("Setting new rule : " , newRule);
        
        setRules(prev => {
            if (!prev) 
                return [newRule]

            return [...prev, newRule]
        })

        setNewRule("")
    }
    
    const handleOnSave = async () => {
        if(newRule !== "")
            return;

        const dataobj: any = {
            ruleType : ruleType,
            content: JSON.stringify(rules)
        }

        if(data){
            dataobj.userId = data.userId;
        }

        http.post(backendUrls.rules.rules, dataobj)
        .then(res => {
            if(res.status === 200)
                toast({
                    title: "Rules saved successfully."
                })
        })
        .catch(err => toast({title: "Error in saving rules!"}))

    }
    
    return <div className=" h-full flex flex-col">
    <h2 className="bg-slate-100 p-3 font-bold">{heading}</h2>
    <div className="grow p-3 flex flex-col justify-between h-full max-h-full">
    <div className="grow">
        {rules ? <Reorder.Group 
            as="ul" 
            axis="y" 
            values={rules} 
            onReorder={setRules} 
            className="space-y-2 h-full">
            {rules.map((item) => (
                <Reorder.Item 
                key={item}
                initial={{translateY: 25}}
                animate={{translateY: 0}}
                value={item} className="w-full rounded p-1 flex flex-row justify-between group">
            {"->"} {item}
            <span
                className="hover:cursor-pointer flex-row flex space-x-2"
                onPointerDown={(e) => controls.start(e)}>
                    <Trash2Icon onClick={() => {setRules(prev => {
                        if(!prev)
                            return
                        const filtered = prev.filter(it => it !== item)
                        return filtered
                    })}} size={20} className={"opacity-50 invisible group group-hover:visible hover:opacity-100"}/>
                <GripVerticalIcon size={20} />
            </span>
            </Reorder.Item>
            ))}
    </Reorder.Group>
    : <div className=" text-muted-foreground text-md text-center">
        No rules found <br /> <br />
        It's better to have a predefined rules for trading. <br />
        Add your rules using the form below.
    </div>    
}
    </div>
    
    <div className="p-2 flex-none flex flex-col space-y-2">
        <Input value={newRule} placeholder="Type your rule here.." type="text" onChange={(e) => setNewRule(e.target.value)} 
            onKeyUp={(e) => {
                if(e.key === "Enter")
                    handleOnAdd()
            }}/>
        <div className="space-x-2">
            <Button className="w-20" size={"sm"} onClick={() => handleOnAdd()}>Add rule</Button>
            <Button className="w-36" size={"sm"} variant={"outline"} onClick={() => handleOnSave()}>Save and Update</Button>
        </div>
    </div>
    </div>
    
    </div>
}
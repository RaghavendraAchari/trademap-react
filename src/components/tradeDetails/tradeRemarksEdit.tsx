import { Edit2Icon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import Trade from "@/models/trade/Trade";
import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import axios from "axios";
import { Button } from "../ui/button";

export default function TradeRemarksEdit({ trade }: { trade: Trade }) {
    const [state, setState] = useState(trade.remarks);

    const handleSave = async () => {

    }

    return <Dialog>
        <DialogTrigger asChild><DropdownMenuItem className="space-x-1 cursor-pointer text-sm" onSelect={(e) => e.preventDefault()}><Edit2Icon size={16} /><span>Edit remarks</span></DropdownMenuItem></DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit remarks</DialogTitle>
            </DialogHeader>
            <div className="">
                <Textarea value={state} onChange={(e) => setState(e.target.value)} rows={10}>

                </Textarea>
            </div>
            <DialogFooter>
                <DialogClose><Button onClick={handleSave}>Save and close</Button></DialogClose>
            </DialogFooter>
        </DialogContent>

    </Dialog>
}


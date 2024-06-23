import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineData } from "../timeline";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function TimelineCard({data}:{data: TimelineData , index?: number}){
    
    return <div className="flex flex-row  group history cursor-pointer">
    <div className="relative w-24 flex-none flex flex-col group-hover:text-slate-800 items-center justify-start mt-10 text-xs font-light text-muted-foreground ">
        <span className="block sticky top-0">
            <p>{format(data.datetime, "dd MMM yy")}</p>
            <p>{format(data.datetime, "h:mm a")}</p>
        </span>
    </div>
    <div className="timeline bg-purple-500 w-[3px] min-h-full flex-none flex flex-col justify-start">
        <div className="w-4 h-4 border-2 bg-purple-50 border-purple-500/100 rounded-full -translate-x-[7px] mt-10"></div>
    </div>
    <div className="grow flex text-sm flex-row min-h-24 items-center p-2 pl-8">
        <AnimatePresence>
            <motion.div  initial={{translateX : 60}} whileInView={{translateX: 0}} exit={{translateX: 0}} transition={{ duration: 0.5, }} 
            className="bg-background rounded border grow h-full group-hover:shadow-inner shadow whitespace-pre relative">
                <div className="w-3 h-3 mt-8 rounded-s-full -translate-x-[12px] absolute bg-background shadow border-s group-hover:shadow-inner"></div>
                <div className="h-[3px]  bg-purple-600 rounded-t-full" ></div>
                {
                    data.type === "text"
                    ? <p  className="px-3 py-3 font-normal">{data.content}</p>
                    : <div className="p-3 space-y-2">
                        <Dialog>
                            <DialogTrigger asChild><img className="bg-slate-100 p-1 rounded-md w-full max-h-52 aspect-video object-contain" src={data.imageUrl} alt={data.id + data.content} /></DialogTrigger>
                            <DialogContent className="min-w-[95vw] min-h-[95vh] p-5">
                                <img className="p-2 mx-auto h-full aspect-video object-contain" src={data.imageUrl} alt={data.imageUrl} />
                            </DialogContent>
                        </Dialog>
                        <p className="font-normal">This is the text</p>
                    </div>
                }
            </motion.div >

        </AnimatePresence>
    </div>
</div>
}

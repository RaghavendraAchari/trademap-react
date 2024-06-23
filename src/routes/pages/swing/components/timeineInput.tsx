import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CircleXIcon, FileImageIcon, SendIcon } from "lucide-react";
import { useState } from "react";

export default function TimelineInput({onSendClick}:{onSendClick: (text: string, files: File[] | undefined) => void}){
    const [files, setFiles] = useState<File[]>()
    const [text, setText] = useState<string>("")

    const handleOnSend = async () => {
        onSendClick(text, files);

        setText("")
        setFiles(undefined)
    }

    return <div className="flex-none flex flex-row items-center space-x-2 p-2 pt-2">
        <Textarea 
            className="min-h-8" 
            onPaste={e => {
                    if(e.clipboardData.files.length > 0){
                        setFiles(prev =>{
                            if(prev)
                                return [...prev, e.clipboardData.files[0]]

                            return [e.clipboardData.files[0]]
                        })
                    }
                }}  
            placeholder="Write your analysis here.. "
            value={text}
            onChange={(e) => setText(e.target.value)}
            >

        </Textarea>
        {
            files && <div className="flex flex-col items-center justify-center grow h-[93px] group relative">
            <div className="text-xs font-bold text-muted-foreground flex flex-row items-center peer">
                <FileImageIcon /> 
                <span>{files.length}</span>
            </div>
            <a onClick={() => setFiles(undefined)} className="absolute top-3 block z-10 text-xs left-1 invisible group-hover:visible font-bold text-muted-foreground hover:cursor-pointer">
                <CircleXIcon size={18}/>
            </a>
        </div>
        }
        <Button className="rounded-full flex-none aspect-square size-10 p-0" onClick={handleOnSend} ><SendIcon size={18}/></Button>
        
    </div>
}
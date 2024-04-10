import Editor from "@/components/textEditor/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputData } from "@editorjs/editorjs";
import { format } from "date-fns";
import { CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DialyNote() {
    const date = new Date();
    const navigate = useNavigate();
    const [data, setData] = useState<OutputData>()

    useEffect(() => {
        setTimeout(() => {
            setData({
                blocks: [
                    {
                        type: "header",
                        data: {
                            level: 2,
                            text: format(date, "E, MMMM dd yyyy")
                        }
                    }
                ]
            })
        }, 1000)
    }, [])

    return <div className="w-full flex flex-col items-end justify-start">
        <h3 className="text-md font-bold p-2 px-3 border-b w-full flex  space-x-5 items-center "><span>Date : {date.toDateString()}</span>
            <span className="text-muted-foreground text-xs font-normal italic">autosaving data every 5 seconds</span>
            <Button variant={"link"} className="mx-2 w-fit space-x-2 place-self-end" onClick={() => {
                navigate("/home/")
            }}><span>Close editing</span> <CircleXIcon size={16} /> </Button>
        </h3>

        <div className="self-start p-3 w-full max-w-full ">
            <form className="flex flex-row space-x-3 border rounded p-3 w-full" action="">
                <Label>Nifty Chart:
                    <Input type="file" accept="image/*" />
                </Label>
                <Label>Bank Nifty Chart:
                    <Input type="file" accept="image/*" />
                </Label>
            </form>
        </div>


        {
            data
                ? <Editor
                    edit={true}
                    data={data}
                    id="editor"
                    setData={(data: OutputData) => {
                        console.log(data);
                    }}
                    className="p-2 cursor-text grow-0"
                    autoSave={true}
                />
                : <div className="flex flex-row justify-start">
                    <h3>Just a min. Looking for existing note.</h3>
                </div>
        }
    </div>
}
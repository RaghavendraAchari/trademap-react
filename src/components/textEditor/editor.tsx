
import { EDITOR_JS_TOOLS } from "./tools";
import { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

//props
type Props = {
    data?: OutputData;
    setData(val: OutputData): void;
    id: string;
    edit: boolean,
    className?: string
};

export default function Editor({ id, data, setData, edit = false, className }: Props) {
    //add a reference to editor
    const ref = useRef<EditorJS>();

    const handleOnSave = async () => {
        if (ref.current) {
            const data = await ref.current.save();
            setData(data);
        }
    }

    //initialize editorjs
    useEffect(() => {
        // console.log("useEffectCalled: ", { edit, data, ref });

        if (ref.current && ref.current.destroy) {
            // console.log("Destroying old editor");
            ref.current.destroy();
        }

        //initialize editor if we don't have a reference
        // console.log("Initializing the editor");
        const editor = new EditorJS({
            holder: id,
            tools: EDITOR_JS_TOOLS,
            data: data,
            readOnly: !edit,
            onReady() {
                ref.current = editor;
            },
        });


        //add a return function handle cleanup
        return () => {
            // console.log("Destroying editor on unmount");

            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, [edit, data]);

    return <div className={cn("grow flex flex-col justify-start items-end min-w-full", className)}>
        <div className="prose max-w-full w-full mt-1 mb-1" id={id} />

        {edit === true && <Button variant={"default"} size={"default"} onClick={handleOnSave} >Save</Button>}
    </div>

}
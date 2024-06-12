"use client"
import { Button } from "@/components/ui/button";
import { InsightHeader } from "./InsightView"
import Insight from "../../models/insights/Insight.model";
import { OutputData } from "@editorjs/editorjs";
import { Dispatch, SetStateAction, useEffect } from "react";
import AskForEdit from "./askForEdit";
import Editor from "@/components/textEditor/editor";
import Scrollbar from 'smooth-scrollbar';


interface Props {
    insight: Insight,
    editContent: boolean,
    setContentEdit: Dispatch<SetStateAction<boolean>>,
    setEditorData: (data: OutputData) => void,
    onDeleteClicked: () => Promise<void>
}

export default function InsightViewWeb({ insight, editContent, setContentEdit, setEditorData, onDeleteClicked }: Props) {
    let insightContent = insight.content === "" ? {} as OutputData : JSON.parse(insight.content)

    useEffect(() => {
        Scrollbar.initAll()
    }, [])

    return <>
        <InsightHeader
            className="flex-none"
            title={insight.title}
            setContentEdit={setContentEdit}
            onDeleteClicked={onDeleteClicked}
            edit={editContent}
        />
        <div className="grow md:flex md:flex-col md:h-full md:max-h-full md:overflow-y-auto">
            {insight.content === "" && (editContent === false)
                ? <AskForEdit />
                : <div className="md:flex md:flex-col md:max-w-full space-y-2 p-2 md:overflow-y-auto">
                    <div
                        data-wrapper
                        data-scrollbar >
                    
                    <Editor autofocus={true} className={`min-w-full ${editContent === false ? "-mt-8" : "max-h-full"}`} id={"editor"} data={insightContent} edit={editContent} setData={setEditorData} />

                    
                    </div>
                </div>
            }
        </div>  
    </>
}
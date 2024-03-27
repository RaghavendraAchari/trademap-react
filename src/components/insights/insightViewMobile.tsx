import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { InsightHeader } from "./InsightView";
import AskForEdit from "./askForEdit";
import { Button } from "@/components/ui/button";
import Insight from "../../models/insights/Insight.model";
import { OutputData } from "@editorjs/editorjs";
import { DialogClose } from "@radix-ui/react-dialog";

import Editor from "@/components/textEditor/editor";

interface Props {
    insight: Insight,
    editContent: boolean,
    setContentEdit: Dispatch<SetStateAction<boolean>>,
    setEditorData: (data: OutputData) => void,
    editorData?: OutputData, openDrawer: boolean,
    setOpenDrawer: Dispatch<SetStateAction<boolean>>
    onDeleteClicked: () => Promise<void>
}

export default function InsightViewMobile({ insight, editContent, setContentEdit, setEditorData, openDrawer, setOpenDrawer, onDeleteClicked }: Props) {

    let insightContent = insight.content === "" ? {} as OutputData : JSON.parse(insight.content)

    return <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="max-h-screen">
            <div className="flex flex-col w-full h-full overflow-y-auto">
                <InsightHeader className="flex-none" edit={editContent} title={insight.title} setContentEdit={setContentEdit} onDeleteClicked={onDeleteClicked} />
                <div className="grow flex flex-col w-full min-h-full items-end p-1 max-h-screen">
                    {insight.content === "" && (editContent === false) ?
                        <AskForEdit />
                        :
                        <div className="flex flex-col w-full items-end space-y-2 p-2">
                            <Editor className="p-1 border-0" id="editor" data={insightContent} edit={editContent} setData={setEditorData} />
                            <DialogClose asChild>
                                <Button variant={"outline"} size={"default"}>Close</Button>
                            </DialogClose>
                        </div>
                    }
                </div>
            </div>
        </DrawerContent>
    </Drawer>

}
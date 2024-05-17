import DisplayHeader from "@/components/commons/DisplayHeader";
import Editor from "@/components/textEditor/editor";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import useFetchTodaysNote from "@/hooks/dashboard/useFetchDailyNote";
import { OutputData } from "@editorjs/editorjs";
import { format } from "date-fns";
import { CircleXIcon, PlusCircleIcon } from "lucide-react";
import React, { ClipboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DialyNote() {
    const date = new Date();
    const navigate = useNavigate();
    const { toast } = useToast();

    const { data, error, loading, refresh } = useFetchTodaysNote(backendUrls.dailyNote.todaysNote)
    console.log({ data });


    const onSave = async (data: OutputData) => {
        http.post(backendUrls.dailyNote.allNotes, JSON.stringify(data), {
            headers: {
                "Content-Type": "text/plain"
            }
        })
            .then(res => {
                navigate("/home/")
            })
            .catch(err => toast({
                title: "Not able to save the data."
            }))
    }

    const onUpdate = async (data: OutputData) => {
        http.put(backendUrls.dailyNote.allNotes, JSON.stringify(data), {
            headers: {
                "Content-Type": "text/plain"
            }
        })
            .then(res => {
                navigate("/home/")
            })
            .catch(err => toast({
                title: "Not able to update the data."
            }))
    }


    return <div className="w-full flex flex-col items-start justify-start divide-y overflow-y-auto">
        <DisplayHeader className="p-3 flex-none" title="Daily note" description="Write your analysis about today's market." />
        <h3 className="flex-none text-md font-bold py-1 px-3 border-b w-full flex  space-x-5 items-center "><span>Date : {date.toDateString()}</span>
            <span className="text-muted-foreground text-xs font-normal italic">autosaving data every 5 seconds</span>
            <Button variant={"link"} className="mx-2 w-fit space-x-2 place-self-end" onClick={() => {
                navigate("/home/")
            }}><span>Close editing</span> <CircleXIcon size={16} /> </Button>
        </h3>

        {loading && <div className="flex flex-row justify-start items-start">
            <h3>Just a min. Looking for existing note.</h3>
        </div>}

        {
            (!loading && data)
                ? <Editor
                    edit={true}
                    data={data as unknown as OutputData}
                    id="editor-update"
                    setData={onUpdate}
                    className="p-2 cursor-text grow overflow-y-auto"
                    autoSave={false} />
                : null
        }
        {
            (!loading && data === null && error === null)
                ? <Editor
                    edit={true}
                    data={{
                        blocks: [
                            {
                                type: "header",
                                data: {
                                    level: 2,
                                    text: format(date, "E, MMMM dd yyyy")
                                }
                            }
                        ]
                    }}
                    id="editor"
                    setData={onSave}
                    className="p-2 cursor-text grow-0"
                    autoSave={false}
                />
                : null
        }
        {
            (!loading && error && data === null)
                ? <Alert>
                    <AlertTitle>Not able to load daily note</AlertTitle>
                </Alert>
                : null
        }
    </div>
}
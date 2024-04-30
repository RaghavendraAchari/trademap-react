import Editor from "@/components/textEditor/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputData } from "@editorjs/editorjs";
import { format } from "date-fns";
import { CircleXIcon, PlusCircleIcon } from "lucide-react";
import React, { ClipboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DialyNote() {
    const date = new Date();
    const navigate = useNavigate();
    const [data, setData] = useState<OutputData>()
    const [images, setImages] = useState<ReactElement[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

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

    const onPaste = (e: ClipboardEvent) => {
        if (inputRef.current) {
            if (e.clipboardData.files.length) {
                const fileData = URL.createObjectURL(e.clipboardData.files[0]);

                const image = <img src={fileData} alt="image" />

                setImages(prev => [...prev, image]);

                const oldFiles = inputRef.current.files;

                if (oldFiles?.length) {
                    const list = new DataTransfer()

                    for (let index = 0; index < oldFiles.length; index++) {
                        const file = oldFiles[index];

                    }
                }
            }
        }

    }

    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files === null)
            return

        const images: ReactElement[] = []

        for (let index = 0; index < e.currentTarget.files.length; index++) {
            const fileData = URL.createObjectURL(e.currentTarget.files[index]);

            const image = <img src={fileData} alt="image" />

            images.push(image);
        }

        setImages(images);

        inputRef.current !== null ? inputRef.current.files = e.currentTarget.files : null;
    }

    return <div className="w-full flex flex-col items-end justify-start">
        <h3 className="text-md font-bold p-2 px-3 border-b w-full flex  space-x-5 items-center "><span>Date : {date.toDateString()}</span>
            <span className="text-muted-foreground text-xs font-normal italic">autosaving data every 5 seconds</span>
            <Button variant={"link"} className="mx-2 w-fit space-x-2 place-self-end" onClick={() => {
                navigate("/home/")
            }}><span>Close editing</span> <CircleXIcon size={16} /> </Button>
        </h3>

        <div className="self-start p-3 w-full max-w-full ">
            <form className="flex flex-row justify-center items-center overflow-hidden max-h-96 bg-purple-50 space-x-3 border rounded p-3 w-full m-auto border-slate-300"
                autoFocus
                onPaste={(e) => {
                    onPaste(e);
                }}>
                <Input
                    onChange={(e) => {
                        onFileSelected(e);
                    }}
                    ref={inputRef}
                    id="chart"
                    className="hidden"
                    name="chart"
                    type="file"
                    multiple accept="image/*" hidden={true} />
                {
                    images
                }
                <Label className="text-center opacity-50 cursor-pointer bg-white p-2 rounded-md w-60 flex flex-col items-center justify-center mt-10" htmlFor="chart">
                    <p className="leading-6">Click to open file window <br />
                        or paste images here</p>
                    <PlusCircleIcon size={48} className="opacity-50 block" /> 
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
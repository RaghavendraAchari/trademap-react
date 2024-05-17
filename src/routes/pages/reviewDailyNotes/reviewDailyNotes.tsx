import DisplayHeader from "@/components/commons/DisplayHeader";
import Editor from "@/components/textEditor/editor";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import backendUrls from "@/constants/backendUrls";
import useFetchTodaysNote from "@/hooks/dashboard/useFetchDailyNote";
import { OutputData } from "@editorjs/editorjs";
import { format } from "date-fns";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Scrollbar from 'smooth-scrollbar';

export default function ReviewDailyNotes() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { data, error, loading } = useFetchTodaysNote(backendUrls.dailyNote.todaysNote);

    console.log({ selectedDate: selectedDate.toDateString() });

    useEffect(() => {
        Scrollbar.initAll();
    })


    return <>
        <DisplayHeader title="Daily Notes Review" description="Study the past charts for better understanding of the market." className='flex-none bg-background p-3' />
        <div className="md:flex md:flex-col md:grow md:max-h-full  md:overflow-y-auto bg-background">
        <div className="flex flex-row justify-between items-center mb-2 flex-none h-12 px-3 w-full border-b ">
            <h3 className="text-lg font-bold">Daily market analysis notes:</h3>
            <div className="flex flex-row items-center space-x-2">
                <Button className="space-x-1" variant={"ghost"} onClick={() => {
                    setSelectedDate(new Date(selectedDate.getTime() - (60 * 60 * 24 * 1000)))
                }}> <ArrowLeftCircleIcon /> <span>Prev</span> </Button>

                <div className="flex flex-row items-center space-x-1">
                    <span className="whitespace-nowrap text-sm font-medium">Go to date : </span>
                    <DatePicker
                        defaultdDate={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                        }}
                    />
                </div>
                <Button
                    className="space-x-1"
                    disabled={selectedDate.toLocaleDateString() === new Date().toLocaleDateString()}
                    variant={"ghost"}
                    onClick={() => {
                        setSelectedDate(new Date(selectedDate.getTime() + (60 * 60 * 24 * 1000)))
                    }} >
                    <span>Next</span> <ArrowRightCircleIcon />
                </Button>

            </div>
        </div>

            <div className="p-3 w-full grow overflow-y-auto flex">
            {
                !loading && data
                        ? <div data-scrollbar >
                            <Editor
                                className="w-full -mt-12 "
                                edit={false}
                                id="editor-readonly"
                                data={data as unknown as OutputData}
                                autoSave={false}
                                setData={(data) => { }} />

                        </div>

                    : null
            }
            {
                    !loading && !error && !data ? <div className="bg-purple-100 shadow-inner rounded flex items-center justify-center w-full h-32">No note is available for the date - {format(selectedDate, "d MMM yyyy")}</div> : null
                }
                {
                !loading && error
                    ? <>Error</>
                    : null
            }
        </div>
    </div>
    </>
}
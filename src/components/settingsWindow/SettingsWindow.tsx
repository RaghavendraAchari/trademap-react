import { Settings, Settings2Icon, Terminal, ThumbsDown, ThumbsDownIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogClose, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { FormEvent, useContext, useEffect, useState } from "react";
import SettingsModel from "@/models/settings/settings.model";
import { SettingsContext } from "@/context/SettingsContext";


export default function SettingsWindow() {
    const [open, setOpen] = useState(false);
    const settingsContext = useContext(SettingsContext);


    const onSettingsSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        let id: any = null;

        if (settingsContext && settingsContext.data?.id) id = settingsContext.data?.id

        const dataObject: unknown = {
            id: id,
            maxTradesLimit: formData.get("maxTrades"),
            warnWhenMaxLimitReached: formData.get("maxTradesWarning") === "on" ? true : false,
            trackingDate: formData.get("date"),
            disableButton: formData.get("disableButton"),
        }

        settingsContext?.onSubmit(dataObject as SettingsModel);
        setOpen(false)
    }

    return <div className='flex flex-row justify-start' >
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>
                    <Button className='text-slate-800 space-x-2 border-0 hidden md:flex' variant={"ghost"} size={"default"}><Settings2Icon /> <span>Settings</span></Button>

                    <Button className='text-main space-x-2 flex md:hidden border' variant={"outline"} size={"default"}><Settings2Icon /> <span>Settings</span></Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>All the settings for the app</DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => onSettingsSubmit(e)} className='flex flex-col space-y-3'>
                    {
                        settingsContext?.notFound === true ?
                            <Alert className="text-sm mb-5 space-x-1 bg-pink-50 border-2 border-pink-200" variant={"default"}>
                                <ThumbsDownIcon />
                                <AlertTitle>Could not find the settings</AlertTitle>
                                <AlertDescription>Looks like you are a new user. Please take a moment to set settings.</AlertDescription>
                            </Alert>
                            : null
                    }

                    <div className="group flex flex-col space-y-1">
                        <Label htmlFor='maxTrades'> Maximum trades limit per day :</Label>
                        <div className='flex flex-row items-center justify-between space-x-1'>
                            <Input name="maxTrades" type='number' id='maxTrades' defaultValue={settingsContext?.data?.maxTradesLimit} placeholder='Enter a number' />
                        </div>
                    </div>

                    <div className="group flex items-start justify-between mt-10">
                        <Label className='w-full flex flex-col space-y-1' htmlFor='maxTradesWarning'>
                            <span>Warn me when trade limit is reached</span>
                            <span className='text-xs text-slate-500'>Displays a banner in the dashboard when max trades are taken</span>
                            <span className='pt-2 text-slate-600'>Banner Sample:</span>
                            <span className='m-auto w-[90%]'>
                                <Alert className='opacity-60 mt-2'>
                                    <Terminal />
                                    <AlertTitle>Stop trading for the day</AlertTitle>
                                    <AlertDescription>You have reached max limit for the day.</AlertDescription>
                                </Alert>
                            </span>
                        </Label>
                        <Switch name="maxTradesWarning" defaultChecked={settingsContext?.data?.warnWhenMaxLimitReached} id='maxTradesWarning' />
                    </div>

                    <div className="group flex items-start justify-between mt-10">
                        <Label className='w-full flex flex-col space-y-1' htmlFor='disableButton'>
                            <span>Disable the " + Add new trade" button when limit reached</span>
                            <span className='text-xs text-slate-500'>You will not be able to add new trades when trade limit per day is reached</span>
                        </Label>
                        <Switch name="disableButton" defaultChecked={settingsContext?.data?.disableButton} id='disableButton' />
                    </div>

                    <div className="group flex flex-col space-y-1 mt-10">
                        <Label htmlFor='date'>Set tracking date :</Label>
                        <div className='flex flex-row items-center justify-between space-x-1'>
                            <Input name="date" type='date' id='date' defaultValue={settingsContext?.data?.trackingDate} placeholder='Enter a number' />
                        </div>
                    </div>
                    <Button type="submit" variant={"default"} >{settingsContext?.notFound === true ? "Save" : "Update"}</Button>
                </form>

            </DialogContent>
        </Dialog>
    </div>
}
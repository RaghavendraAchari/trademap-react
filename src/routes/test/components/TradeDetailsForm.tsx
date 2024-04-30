"use client"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useToast } from "@/components/ui/use-toast"
import {
    Dialog,
    
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { ReactElement, useState } from "react"
import useFetch from "@/hooks/useFetch"
import SetupsAndInstruments from "@/models/trade/SetupsAndInstruments"
import backendUrls from "@/constants/backendUrls"

import { ScrollArea } from "@/components/ui/scroll-area"
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import useFetchMaxTradedDays from "./useFetchMaxTradedDays";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const TradeDetailsSchema = z.object({
    day: z.number(),
    dateTime: z.string(),
    instrumentType: z.enum(["INDEX", "STOCK", "COMMODITY"]),
    instrumentName: z.string(),
    setupName: z.string(),
    rr: z.number().min(0),
    rrOnPremium: z.number().min(0),
    resultType: z.enum(["PartialTarget", "Target", "CTC", "PartialSL", "SL",]),
    remarks: z.string().min(1),
    images: z.instanceof(FileList),
    pnl: z.number(),
})

interface Props {
    forDate: Date;
    onDataSubmit: () => void;
    disabled?: boolean
}

export default function TradeDetailsForm({ forDate, onDataSubmit, disabled }: Props) {
    const { data: setupsAndInstruments, error, loading, refresh } = useFetch<SetupsAndInstruments>(backendUrls.tradeDetails.setupsAndInstuments);
    const { maxDay } = useFetchMaxTradedDays()
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const { toast } = useToast()

    const onSubmit = (data: z.infer<typeof TradeDetailsSchema>) => {
        console.log(data);
    }

    const [imagePreviews, setImagePreviews] = useState<ReactElement[]>([])
    const form = useForm<z.infer<typeof TradeDetailsSchema>>({
        resolver: zodResolver(TradeDetailsSchema),
        defaultValues: {
            day: maxDay ? maxDay : 0,
            instrumentType: "INDEX",
            resultType: "PartialTarget",
            dateTime: forDate.toISOString().substring(0, 16),
            instrumentName: "",
            pnl: 0,
            remarks: "",
            rr: 0,
            rrOnPremium: 0,
            setupName: "",
            images: undefined

        }
    })


    function handleOnImagePaste(e: React.ClipboardEvent<HTMLFormElement>) {
        console.log("Image pasted");

        if (e.clipboardData.files.length === 0)
            return;

        let inputFiles = form.getValues("images");

        let fileList = new DataTransfer()

        //if files are present already then copy old images
        if (inputFiles) {
            Array.from(inputFiles).forEach(it => {
                fileList.items.add(it)
            })
        }

        //add the current image
        fileList.items.add(e.clipboardData.files[0])

        //set the images
        form.setValue("images", fileList.files, { shouldValidate: true });

        //render the images
        setImages(fileList.files)
    }

    function setImages(fileList: FileList) {
        let previews: ReactElement[] = [];

        Array.from(fileList).forEach((file) => {
            console.log("reading file " + file.name);

            let reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                const image = React.createElement("img", {
                    src: reader.result,
                    key: file.name
                })
                previews.push(image);
                setImagePreviews(lastData => [...previews])
            }
        })

        return previews;
    }

    return <div className="flex w-full justify-center p-2">
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild >
                <Button disabled={disabled} className="justify-self-center w-fit " variant={"outline"}>+ Add new trade details</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col md:max-w-[800px]">
                <DialogHeader className="flex-none">
                    <DialogTitle>New Trade</DialogTitle>
                    <DialogDescription>
                        Add trade details below
                    </DialogDescription>
                </DialogHeader>

                <Separator />

                <ScrollArea className="grow  h-[600px] md:p-2">
                    <Form {...form} >
                        <form onPaste={(e) => {
                            console.log("onPasted");
                            handleOnImagePaste(e)

                        }} onSubmit={form.handleSubmit((data) => onSubmit(data))} className="space-y-4 grow max-h-full w-full p-2 overflow-y-auto">
                            {/* day */}
                            <FormField
                                name="day"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Day:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="day"
                                                type="number"
                                                step={"any"}
                                                {...field}
                                                onChange={e => field.onChange(e.target.valueAsNumber)}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* dateTime */}
                            <FormField
                                name="dateTime"
                                control={form.control}

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date and time: </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                onChange={(e) => {
                                                    console.log(e.target.value);

                                                    field.onChange(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* instrumentType */}
                            <FormField
                                name="instrumentType"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instrument Type:</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="INDEX" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Index
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="STOCK" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Stocks
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="COMMODITY" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Commodity
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="instrumentName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instrument Name: </FormLabel>
                                        <FormControl>
                                            <Input {...field} onChange={(e) => {
                                                field.onChange(e)
                                            }} placeholder="Instrument Name" />

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ScrollArea className="text-sm flex flex-col h-52 border rounded">
                                {
                                    !loading && setupsAndInstruments
                                        ? setupsAndInstruments.instrumentNames.map(it => {
                                            return <div className="p-2 mb-1 cursor-pointer hover:bg-slate-100" key={it} onClick={() => {
                                                form.setValue("instrumentName", it)

                                            }}>{it}</div>
                                        })
                                        : null
                                }
                            </ScrollArea>


                            <FormField
                                name="setupName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Setup name: </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Setup Name" />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ScrollArea className="text-sm flex flex-col h-52 border rounded">
                                {
                                    !loading && setupsAndInstruments
                                        ? setupsAndInstruments.setupNames.map(it => {
                                            return <div className="p-2 mb-1 cursor-pointer hover:bg-slate-100" key={it} onClick={() => {
                                                form.setValue("setupName", it)
                                            }}>{it}</div>
                                        })
                                        : null
                                }
                            </ScrollArea>


                            <FormField
                                name="rr"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RR / RR on index:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Risk to reward ratio"
                                                type="number"
                                                step={0.1}
                                                {...field}
                                                onChange={e => field.onChange(e.target.valueAsNumber)}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="rrOnPremium"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RR / RR on premium: </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Risk to reward ratio on FnO chart"
                                                type="number"
                                                step={0.1}
                                                {...field}
                                                onChange={e => field.onChange(e.target.valueAsNumber)}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="resultType"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instrument Type:</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="PartialTarget" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Partial Target
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Target" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Target
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="CTC" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Cost To Cost (CTC)
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="PartialSL" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        Partial Stop Loss
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="SL" />
                                                    </FormControl>
                                                    <FormLabel className="font-semibold cursor-pointer">
                                                        SL
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="remarks"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description / Remarks: </FormLabel>
                                        <FormControl>
                                            <Textarea className="min-h-[300px]" {...field} onChange={(e) => {
                                                field.onChange(e)
                                            }} placeholder="Remarks..." />

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="pnl"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profit / Loss: </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Profit/loss in (+/-)rupees"
                                                type="number"
                                                step={0.1}
                                                {...field}
                                                onChange={e => field.onChange(e.target.valueAsNumber)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="images"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Images: </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                multiple={true}
                                                onChange={(e) => {
                                                    field.onChange(e.target.files)

                                                    if (e.target.files)
                                                        setImages(e.target.files)
                                                }}
                                                accept="image/png, image/gif, image/jpeg"

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                imagePreviews
                            }
                            <Button type="submit">Submit</Button>
                        </form>

                    </Form>
                </ScrollArea>


            </DialogContent>
        </Dialog>

    </div>



}
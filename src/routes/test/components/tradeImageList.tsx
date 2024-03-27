import { useEffect, useState } from "react";
import { Image } from "../page";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"
import Trade from "@/models/trade/Trade";
import backendUrls from "@/constants/backendUrls";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TradeImageList({ trade }: { trade: Trade }) {
    const [open, setOpen] = useState<boolean>(false);
    const [api, setApi] = useState<CarouselApi>()
    const [selectedIndex, setSelectedIndex] = useState<number>()

    useEffect(() => {
        if (!api) {
            return
        }

        if (selectedIndex) {
            api.scrollTo(selectedIndex)
        }
    }, [api])

    return <>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="min-w-fit max-w-fit max-h-[50vh] " asChild>
                <div className="flex flex-row gap-1 flex-wrap">
                    {trade.imagePaths.map((image, index) => <ImageWithLoader className="bg-background h-32 p-1 w-64 object-contain rounded-md border hover:shadow" onClick={() => {
                        setSelectedIndex(index)
                    }} key={index} path={image} />)}
                </div>
            </DialogTrigger>

            <DialogContent data-dialogcontent className="flex flex-col w-full h-full max-h-full max-w-full bg-transparent">
                <DialogHeader className="flex-none">
                    <DialogTitle>Images of the trade</DialogTitle>
                    <DialogDescription>All the images that were uploaded for this trade</DialogDescription>
                </DialogHeader>
                <div className="grow max-w-full px-12 py-4 overflow-y-auto">
                    <Carousel className="w-full h-full" setApi={setApi}>
                        <CarouselContent className="w-full h-full" >
                            {trade.imagePaths.map((image, index) => {
                                return <CarouselItem className="w-full h-full" key={index} >
                                    <Card className="w-full h-full p-1">
                                        <CardContent className="w-full h-full p-0">
                                            <ImageWithLoader path={image} />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            })}
                        </CarouselContent>
                        <CarouselPrevious className="" />
                        <CarouselNext className="" />
                    </Carousel>
                </div>
                <DialogFooter className="flex-none">
                    <DialogClose asChild><Button variant={"outline"} size={"default"}>Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}


function ImageWithLoader({ path, onClick, className }: { className?: string, path: string, onClick?: () => void }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    return <div className={cn("flex items-center justify-center w-full h-full", className)}>
        {error ? <p className="text-red-300 text-center text-xs">{error}</p> : null}
        <Loader2 className={"w-4 h-4 spin self-center " + (loading ? "block" : "hidden")} />
        {!error && <img
            onClick={onClick}
            onError={(e) => {
                setError("Image unavailable");
                setLoading(false)
            }}
            onLoad={() => {
                setLoading(false)
            }}
            className={"w-full h-full aspect-video object-contain " + (!loading ? "block" : "hidden")} src={backendUrls.tradeDetails.getImageDownloadablePath(path)} alt="path" />}
    </div>

}
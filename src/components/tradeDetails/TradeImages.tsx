import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Dispatch, SetStateAction, useState } from "react"
import { ArrowLeftCircle, ArrowRightCircle, Loader2, Terminal } from "lucide-react"
import backendUrls from "@/constants/backendUrls"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    images: string[]
}

export default function TradeImages({ images, className, ...props }: Props) {
    const [open, setOpen] = useState(false);


    const setImageForDialog = () => {

    }

    return <div className={cn("grid w-full grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2", className)} {...props}>
        {
            images.length === 0
                ? <Alert>
                    <Terminal />
                    <AlertTitle>No images to show.</AlertTitle>
                    <AlertDescription>The images have not been uploaded to this trade.</AlertDescription>
                </Alert>
                : <>
                    <TradeImagesList images={images} setImageForDialog={setImageForDialog} />

                </>
        }
    </div>
}

export function DisplayImagesInDialog({ open, setOpen, images, selectedPath }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, images: string[], selectedPath: string }) {
    const [imageIndex, setImageIndex] = useState(images.findIndex((path) => path === selectedPath));

    return <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent>
            <div className="leftbutton"><Button size={"icon"}><ArrowLeftCircle /></Button></div>
            <div className="image w-full h-full">
                {/* Add carousal here.. add start index */}

            </div>
            <div className="rightbutton"><Button size={"icon"}><ArrowRightCircle /></Button></div>
        </DialogContent>
    </Dialog>
}

export function TradeImagesList({ images, setImageForDialog }: { images: string[], setImageForDialog: (path: string, totalImages: number) => void }) {

    return images.map((path) => {
        return <ImageWithLoader path={path} key={path} onImageClick={(path: string) => {
            setImageForDialog(path, images.length)
        }} />
    })
}

function ImageWithLoader({ path, onImageClick }: { path: string, onImageClick: (path: string) => void }) {
    const [loading, setLoading] = useState(true);

    return <div className="flex items-center justify-center">
        <Loader2 className={"w-4 h-4 spin " + (loading ? "block" : "hidden")} />
        <img onLoad={() => {

            setLoading(false)
        }}
            className={"w-full object-contain " + (!loading ? "block" : "hidden")}
            src={backendUrls.tradeDetails.getImageDownloadablePath(path)}
            alt="path"
            onClick={() => onImageClick(path)}
        />
    </div>

}
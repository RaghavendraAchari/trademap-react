import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface Props {
    className?: string,
    loading: boolean
}

export default function Loader({ className, loading }: Props) {
    const str = "w-4 h-4 spin self-center " + (loading ? "block" : "hidden")

    return <Loader2 className={cn(str, className)} />
}
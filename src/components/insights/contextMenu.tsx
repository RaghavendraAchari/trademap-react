"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContentMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    toolTipTitle: string,
    onClick?: () => void
}

export default function ContentMenu({ toolTipTitle, children, onClick }: ContentMenuProps) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={"outline"} onClick={onClick} size={"icon"}>{children}</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{toolTipTitle}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}
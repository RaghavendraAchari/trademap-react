import useCurrentDate from "../../hooks/useCurrentTime"
import { HTMLAttributes, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "react-router-dom"
import { differenceInMinutes, differenceInSeconds } from "date-fns"



interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
}

export default function DisplayHeader({ className, title, description, ...props }: Props) {

    const pathname = useLocation().pathname;

    return <div className={cn(className)} {...props}>
        <h1 className='text-3xl font-extrabold opacity-80'>{title}</h1>
        <p className="font-medium pt-2 flex justify-between" >{description} </p>
    </div>
}

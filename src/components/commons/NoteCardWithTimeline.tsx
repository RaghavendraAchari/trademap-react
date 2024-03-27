import { getDateInISOAsLocalDate, getFullDateTime } from "@/lib/dateUtils";
import Note from "@/models/notes/Note"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";

interface Props {
    note: Note,
    handleDeleteNote: (note: Note) => void
}

export default function NoteWithTimeline({ note, handleDeleteNote }: Props) {
    let categories = null, tags = null;

    if (note.categories && note.categories.length > 0) {
        categories = note.categories.map((it) => <span key={it} className="rounded-full border p-1 px-2 text-xs">{it}</span>);
    }

    if (note.tags && note.tags.length > 0) {
        tags = note.tags.map((it) => <span key={it} className="rounded-full border p-1 px-2 text-xs">{it}</span>);
    }


    return <div className="note mx-auto flex min-h-64 flex-row  p-2 py-0 min-w-full">
        <div className="timeline min-h-full w-4 border border-gray-200 bg-primary shadow-md"></div>

        <div className="connector z-10 -ml-4 flex min-h-full w-20 items-center">
            <div className="left-ball h-4 w-4 flex-none rounded-full border-4 border-white bg-primary shadow-md"></div>
            <div className="line h-1 grow bg-primary"></div>
            <div className="right-ball h-4 w-4 flex-none rounded-full border-4 border-white bg-primary shadow-md"></div>
        </div>

        <div className="py-2 w-full">
            <div className="card border z-9 -ml-6 flex min-h-full w-full max-w-full flex-col self-center rounded-lg bg-white p-2 pl-8 text-justify text-sm font-bold shadow whitespace-pre first-letter:capitalize">
                <div className="dateTime">
                    <p className="flex items-center justify-end text-end opacity-[75%] font-medium text-xs">
                        {getFullDateTime(new Date(note.dateTime))}
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild className="cursor-pointer ml-1 "><Button className="p-0 px-2" size={"sm"} variant={"ghost"}><MoreVerticalIcon size={16} /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-xs">
                                <DropdownMenuItem onClick={() => handleDeleteNote(note)} className="space-x-1 cursor-pointer text-sm"><Trash2Icon size={16} /><span>Delete</span></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </p>
                </div>
                <div className="header flex min-h-10 w-full items-center justify-between gap-1 rounded-tl-md rounded-tr-md  px-2">
                    <h5 className="grow text-wrap py-2 ">{note.title}</h5>
                    <div className="flex-none self-start py-2">
                        {tags}
                    </div>
                </div>

                <article className="body grow px-2 text-sm font-medium min-h-[6em] max-w-full flex">
                    <p className="text-wrap break-words" style={{ "textWrap": "wrap" }}>{note.content}</p>
                </article>

                <div className="footer flex min-h-10 w-full items-center justify-between gap-1 rounded-bl-md rounded-br-md  px-2 py-2">
                    <h5 className="grow text-wrap opacity-80">{note.desciption}</h5>
                    <div className="tags flex-none self-end py-2">
                        {categories}
                    </div>
                </div>
            </div>
        </div>
    </div>
}
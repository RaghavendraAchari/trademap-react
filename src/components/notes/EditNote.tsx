"use client"
import useCurrentDate from "@/hooks/useCurrentTime";
import { Button } from "@/components/ui/button";
import Note from "@/models/notes/Note";
import { postNote } from "@/services/notesService"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BanIcon, CrossIcon, CrosshairIcon, PlusCircleIcon, XCircleIcon } from "lucide-react";
import useTags from "../../hooks/notes/useTags";
import useCategories from "../../hooks/notes/useCategories";
import Tags from "./Tags";
import Categories from "./Categories";
import { Textarea } from "@/components/ui/textarea";
import { getDateInISOAsLocalDate, getFullDateTime, getFullDateTimeWithMinutes } from "@/lib/dateUtils";
import axios from "axios";
import backendUrls from "@/constants/backendUrls";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface Props {
    note: Note,
    onSave: () => void
}


export default function EditNote({ note, onSave }: Props) {
    const { date } = useCurrentDate();

    const { tags, setTags, removeTag, addNewTag } = useTags();
    const { categories, addNewCategory, removeCategory, setCategories } = useCategories();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [footer, setFooter] = useState("")

    const { toast } = useToast()

    const reset = () => {
        setTags([])
        setCategories([])
        setTitle("")
        setDescription("")
        setFooter("")
    }

    const handleOnSave = async () => {
        const note: Note = {
            id: null,
            title,
            desciption: footer,
            dateTime: getDateInISOAsLocalDate(date),
            categories,
            tags,
            content: description
        }
        console.log(note);

        try {
            const res = await axios.post(backendUrls.notes.allNotes, note)
            if (res.status === 200) {
                toast({ title: "Note save successfully." })
                reset()
                onSave()
            }

        } catch {
            toast({ title: "Something went wrong." })
        }

    }

    return <div className="note mx-auto flex min-h-64 flex-row  p-2 py-0 min-w-full backdrop-blur-lg text-xs md:text-sm">
        <div className="timeline min-h-full w-4 border border-gray-200 bg-primary shadow-md"></div>

        <div className="connector z-10 -ml-4 flex min-h-full w-20 items-center">
            <div className="left-ball h-4 w-4 flex-none rounded-full border-4 border-white bg-primary shadow-md"></div>
            <div className="line h-1 grow bg-primary"></div>
            <div className="right-ball h-4 w-4 flex-none rounded-full border-4 border-white bg-primary shadow-md"></div>
        </div>

        <div className="py-2 w-full">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleOnSave()
                }}

                className="card z-9 -ml-6 flex min-h-full w-full flex-col self-center rounded-lg bg-white p-2 pl-8 text-justify text-base font-medium shadow border ">
                <div className="dateTime"><p className="text-xs text-end opacity-80">{format(date, "d MMM yyyy - h:mm:ss a")}</p></div>

                <div className="header flex flex-col md:flex-row items-start justify-between gap-1 rounded-tl-md rounded-tr-md bg-slate-100 px-2 py-2">
                    <Input name="title" value={title} className="grow text-wrap h-8" placeholder="Add title" onChange={(e) => setTitle(e.target.value)} required />

                    <div className="flex-none flex items-center justify-start self-start  space-x-1">
                        <Tags tags={tags} setTags={setTags} addNewTag={addNewTag} removeTag={removeTag} />
                    </div>
                </div>

                <Textarea
                    name="content"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="body grow px-2 text-sm font-medium my-1"
                    placeholder="Add note details here..."
                    rows={5}
                    required
                >

                </Textarea>

                <div className="footer flex flex-col md:flex-row min-h-10 w-full items-start justify-between gap-1 rounded-bl-md rounded-br-md bg-slate-200 px-2 py-2">
                    <Input name="footer" value={footer} onChange={e => setFooter(e.target.value)} className="grow text-wrap h-8" placeholder="Add footer (optional)" />
                    <div className="flex-none flex items-center justify-start self-start  space-x-1">
                        <Categories categories={categories} addNewCategories={addNewCategory} removeCategories={removeCategory} setCategories={setCategories} />
                    </div>
                </div>
                <div className="flex min-h-10 w-full items-center justify-end gap-1 rounded-bl-md rounded-br-md bg-background px-2 py-2">
                    <Button type="submit" className="button border border-slate-200 p-2 " >Save</Button>
                </div>
            </form>
        </div>
    </div>
}




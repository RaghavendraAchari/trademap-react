import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircleIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"

export default function Categories({ categories, addNewCategories, setCategories, removeCategories }: { categories: string[], addNewCategories: (state: string) => void, setCategories: (state: any) => void, removeCategories: (index: number) => void }) {
    const [state, setState] = useState("")
    const [error, setError] = useState<string>("")
    const expression = /^#\w+$/ug;

    const handleOnEnterPressed = () => {
        if (state !== "" && state.match(expression)) {
            addNewCategories(state);
            setState("");
        }
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value !== "" && e.target.value.match(expression)) {
            addNewCategories(state);
            setState("");
            setError("")
        } else {
            setError("Tags must start with '#' character")
        }
    }

    return <div className="space-y-1">
        {
            categories.map((category, index) => {
                return <div key={index} className="flex flex-row items-center space-x-1 h-8">
                    <p className="grow text-sm bg-background rounded-sm  p-1">{category}</p>
                    <Button size={"icon"} variant={"ghost"} className="text-slate-600 h-4 w-4 rounded-full flex items-center justify-center font-semibold shadow-sm" onClick={() => removeCategories(index)}><XCircleIcon className="w-full h-full" /></Button>
                </div>
            })
        }
        <div className="flex flex-row gap-1 items-center">
            <Input
                className="px-1 h-8"
                value={state}
                type="text"
                placeholder="#TAG"
                onChange={(e) => setState(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        handleOnEnterPressed()
                    }
                }}
                onBlur={(e) => {
                    handleOnBlur(e);
                }}
            />
            <Button title="Add a new category" size={"icon"} variant={"ghost"} className="h-4 w-4 text-slate-600 rounded-full flex items-center justify-center font-semibold shadow-sm" onClick={() => { addNewCategories(state); setState("") }}><PlusCircleIcon /></Button>

        </div>
        <div className="text-xs text-red-500 font-medium">{error !== "" && error}</div>

    </div>

}

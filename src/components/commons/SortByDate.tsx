import { SORT } from "@/constants/SortType"
import { ArrowDownWideNarrowIcon, ArrowUpWideNarrowIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"


export function SortByDate({ sort, setSort }: { sort: SORT, setSort: Dispatch<SetStateAction<SORT>> }) {
    return <span onClick={() => { setSort((prev: SORT) => prev === "DESC" ? "ASC" : "DESC") }} className="flex flex-row space-x-2 text-sm font-medium items-center cursor-pointer select-none">
        <span>Sort by date :</span>
        {sort === "DESC" ? <ArrowDownWideNarrowIcon className="w-4 h-4" /> : <ArrowUpWideNarrowIcon className="w-4 h-4" />}
    </span>
}
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

export default function NotesInfo({ className }: Props) {
    return <div className={cn("h-full max-h-full w-full overflow-auto rounded-sm border p-2 text-sm font-bold bg-background prose text-center", className)}>
        <img src="/Design-notes.svg" alt="notes" />
        <h3>These personal tiny notes provide subtle yet meaningful pychological gains for a trader</h3>
        <p className="font-normal leading-6 mt-5">These notes can be a <strong>thought</strong> or <strong>flash of an idea</strong> - which a trader might come across in his trading journey. <br />One might have picked it from articles, learning materials, interviews of different persons.</p>
        {/* <h6 className="mt-2 text-xs opacity-60">Categories:</h6>
        <div className="selected my-1 flex flex-wrap justify-start gap-1 rounded-md bg-slate-50 p-2 font-mono text-xs">
            <span className="rounded-full border bg-white p-1 px-2 text-xs">New</span>
        </div>
        <div className="options flex flex-wrap justify-start gap-1 px-2 py-2 font-mono">
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Hot</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Hotest</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Cool</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Warm</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Hot</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Hot</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">Hot</span>
        </div>

        <h6 className="mt-2 text-xs opacity-60">Tags:</h6>
        <div className="selected my-1 flex flex-wrap justify-start gap-1 rounded-md bg-slate-50 p-2 font-mono text-xs">
            <span className="rounded-full border bg-white p-1 px-2 text-xs">#New</span>
        </div>
        <div className="options flex flex-wrap justify-start gap-1 px-2 py-2 font-mono">
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Hot</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Hotest</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Cool</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Warm</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Hot</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Hot</span>
            <span className="cursor-pointer rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-xs opacity-80 shadow-sm hover:opacity-100 hover:shadow-md">#Hot</span>
        </div>
        <h5 className="mt-2 border-b opacity-60">Search by keyword:</h5>
        <div className="selected my-1 flex w-full max-w-full flex-wrap justify-start gap-1 rounded-md bg-slate-50 p-2 font-mono text-xs">
            <div className="flex min-w-full items-center justify-between">
                <input className="mr-2 min-w-10 grow rounded-md border p-2" placeholder="keywords" type="text" name="keyword" id="keyword" />
                <button className="rounded-md p-1 hover:shadow-sm hover:shadow-slate-300 focus:shadow-inner focus:shadow-slate-300"><span className="cursor-pointer hover:shadow-sm">🔍</span></button>
            </div>
        </div> */}
    </div>
}
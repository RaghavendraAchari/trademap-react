import DisplayHeader from "@/components/commons/DisplayHeader";

export default function RuleBook(){
    return <>
    <DisplayHeader 
        title="Rule book" 
        description="Rules to follow while trading" className='flex-none bg-background p-3' />
    
    <div className="w-full grow grid grid-cols-2 gap-0 divide-x">
        <div>
        <h2 className="bg-slate-100 p-3">Rules for intraday:</h2>
        <div className="grow p-3">
            <ul className="list-inside list-disc text-xl font-semibold text-slate-500">
                <li>Trade only inside candle for 1 week</li>
                <li>Only 600 loss pre day</li>
                <li>In nifty max loss per trade is 10Rs and for Bank Nifty it is 25 Rs</li>
            </ul>
        </div>
        </div>
        <div>
        <h2 className="bg-slate-100 p-3">Rules for swing trade:</h2>
        </div>
    </div>
    </>
}
import Trade from "@/models/trade/Trade";
import TradeDetailsCard from "./TradeDetailsCard";
import { format } from "date-fns";

interface Props {
    tradesList: Array<Trade>,
    showFullDate: boolean,
    showOptions?: boolean
    groupBydate?: boolean
}

export default function TradeDetailsList({ tradesList, showFullDate, showOptions = false, groupBydate = false }: Props) {
    const map = new Map<string, Trade[]>();

    if (groupBydate) {
        tradesList.map(trade => {
            const date = format(new Date(trade.dateTime), "dd MMM yyyy");
            const value = map.get(date);

            if (value) {
                value.push(trade);
                map.set(date, value)
            } else {
                map.set(date, Array.of(trade))
            }
        })

        const tradeUIList: JSX.Element[] = [];

        map.forEach((list, date) => {
            tradeUIList.push(<div key={date} className="mb-2" id={date}>
                <h3 className="p-2 bg-main-fade rounded sticky top-0 z-10 font-semibold text-sm shadow">{date}</h3>
                <div>
                    {
                        list.map((trade) => {
                            return <TradeDetailsCard key={trade.id} trade={trade} showFullDate={showFullDate} showOptions={showOptions} />
                        })
                    }
                </div>
            </div>)
        })

        return tradeUIList;
    }

    return tradesList.map(trade => {
        return <TradeDetailsCard key={trade.id} trade={trade} showFullDate={showFullDate} showOptions={showOptions} />
    })
}
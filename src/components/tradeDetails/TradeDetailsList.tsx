import Trade from "@/models/trade/Trade";
import TradeDetailsCard from "./TradeDetailsCard";

interface Props {
    tradesList: Array<Trade>,
    showFullDate: boolean,
    showOptions?: boolean

}

export default function TradeDetailsList({ tradesList, showFullDate, showOptions = false }: Props) {
    return tradesList.map(trade => {
        return <TradeDetailsCard key={trade.id} trade={trade} showFullDate={showFullDate} showOptions={showOptions} />
    })
}
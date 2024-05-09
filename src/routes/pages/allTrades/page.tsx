import { Route, Routes, useNavigate } from "react-router-dom";
import AllTrades from "./AllTrades";
import TradePreview from "./tradePreview";

export default function Page() {
    // const [pageNumber, setPageNumber] = useState(0)
    // const [pageSize, setPageSize] = useState(10)
    // console.log(filters);

    return <Routes>
        <Route path="/preview" element={<TradePreview />} />
        <Route path="/" element={<AllTrades />} />
    </Routes>
}

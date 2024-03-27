import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Rs from "../commons/rs";
import currencyFormatter from "@/lib/currencyFormatter";

export default function TotalInvestment({ amount }: { amount: number }) {
    return <Card className="shadow-lg">
        <CardHeader >
            <CardTitle className="flex flex-row justify-between items-center"><span>Total Investment</span> <span>{currencyFormatter.format(amount)} <Rs /></span></CardTitle>
        </CardHeader>
    </Card>
}

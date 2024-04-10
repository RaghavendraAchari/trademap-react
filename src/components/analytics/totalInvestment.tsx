import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Rs from "../commons/rs";
import currencyFormatter from "@/lib/currencyFormatter";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { Investment } from "@/models/analytics/analytics";


export default function TotalInvestment({ amount, list }: { amount: number, list: Investment[] }) {
    return <Card className="shadow-lg">
        <CardHeader >
            <CardTitle className="flex flex-row justify-between items-center">
                <div>
                    <span>Total Investment</span>
                    <span>
                        <Dialog>
                            <DialogTrigger asChild><Button variant={"link"} size={"sm"} className="text-xs text-muted-foreground">Show breakdown</Button></DialogTrigger>
                            <DialogContent>
                                <div className="px-2">
                                    <Table>
                                        <TableCaption>Breakdown of investment</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Alloted for</TableHead>
                                                <TableHead>Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                list.map(data => <TableRow key={data.id}>
                                                    <TableCell>{data.investmentDate}</TableCell>
                                                    <TableCell>{data.instrument}</TableCell>
                                                    <TableCell>{currencyFormatter.format(data.investedAmount)}</TableCell>
                                                </TableRow>)
                                            }
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell >{currencyFormatter.format(amount)}</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </span>
                </div>
                <span>{currencyFormatter.format(amount)} <Rs /></span>

            </CardTitle>
        </CardHeader>
    </Card>
}


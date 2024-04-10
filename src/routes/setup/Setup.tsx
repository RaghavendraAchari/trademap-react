import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface InvestmentDetails {
    instrument: string
    investmentDate: Date
    investedAmount: number | undefined
}

export default function Setup() {
    const [amount, setAmount] = useState<number>()
    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmit = () => {
        const data: InvestmentDetails = {
            instrument: "",
            investmentDate: new Date(),
            investedAmount: amount
        }

        http.post(backendUrls.investmentDetails, data)
            .then(res => {
                navigate("/home")
            })
            .catch(err => {
                toast({
                    title: "Error in saving details"
                })
            })
    }

    return <Dialog open={true} >

        <DialogContent className="pt-10 w-full">
            <div>
                <div className="bg-black flex flex-row items-center space-x-2 rounded-md size-12">
                    <img src="/app-icon.svg" alt="appicon" />
                    <span className="text-muted-foreground text-lg">TradeMap</span>
                </div>
            </div>
            <DialogHeader>
                <DialogTitle>
                    Setup your investment details
                </DialogTitle>
                <DialogDescription>Take a minute and give some details about your investment details for your trading journey</DialogDescription>
            </DialogHeader>

            <div>
                <Label>Total investment amount: <Input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} /></Label>
            </div>

            <DialogFooter>
                <Button onClick={() => onSubmit()}>Let's go</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
} 
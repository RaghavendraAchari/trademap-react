"use client"
import { Suspense, useEffect, useState } from "react";
import TradeImageList from "./components/tradeImageList";
import axios, { AxiosError } from "axios";
import TradeDetailsForm from "./components/TradeDetailsForm";
import { Button } from "@/components/ui/button";
import { } from "lucide-react"

import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';



export interface Image {
    "id": string,
    "author": string,
    "width": number,
    "height": number,
    "url": string,
    "download_url": string
}

export default function Test() {
    return <div className='md:flex md:flex-row md:grow md:h-full md:max-h-full md:divide-x overflow-y-visible md:overflow-y-auto bg-slate-50'>
        {/* <GoogleLoginComponent /> */}
    </div>
}



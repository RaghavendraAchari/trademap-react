import { CredentialResponse, GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios, { AxiosError } from "axios";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import { isMobile } from "react-device-detect";
import { addMinutes, format } from "date-fns";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

const client_id = process.env.CLIENT_ID || "";

export default function Login() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const navigate = useNavigate();
    const [sessionExpired, setSessionExpired] = useState(false);


    useEffect(() => {
        if (sessionStorage.getItem('accessToken')) {
            setShowLoginForm(false)

            navigate("/");
        }
    }, [])

    const onLogin = async (response: CredentialResponse) => {
        console.log(response);

        sessionStorage.clear();
        sessionStorage.setItem("idtoken", response.credential as string);

        if (sessionExpired === true) {
            setSessionExpired(false)
        }

        axios.post(backendUrls.users.login, response.credential)
            .then(res => {
                sessionStorage.setItem("accessToken", res.data.accessToken);
                sessionStorage.setItem("refreshToken", res.data.refreshToken);

                if (res.data === "SETUP") {
                    return navigate("/setup")
                }

                return navigate("/");
            })
            .catch((err: AxiosError) => {
                console.log(err);

                toast("Error in loggin in!")
        })
    }




    return <GoogleOAuthProvider clientId={client_id}>
        <Toaster />
        <div className="flex items-center justify-center h-dvh w-dvw overflow-hidden">
            <img src="/login-bg.jpg" alt="background" className="object-contain max-w-full blur-[2px] opacity-50" />

            <div className="border border-slate-300 p-10 rounded-lg flex flex-col w-96 items-center justify-center shadow-2xl shadow-slate-500 bg-white absolute">
                <div className="shadow rounded-lg  p-2 flex flex-row space-x-3 justify-start self-start items-center w-full border border-spacing-1 border-pink-300">
                    <div className="h-12 w-14 bg-pink-300  rounded-md p-1 flex items-center justify-center">
                        <img className="fill-black object-cover" src="/app-icon.svg" alt="icon" />
                    </div>
                    <div className="w-full grow">
                        <h3 className="text-xl font-medium">TradeMap</h3>
                        <p className="w-full text-sm text-muted-foreground">Learn, research and learn</p>
                    </div>
                </div>

                {
                    sessionExpired && <h3>Session Expired. Please relogin.</h3>
                }

                <div className="space-y-4 mt-10 flex flex-col justify-center items-center w-full border border-pink-300 rounded-md p-2 pb-4 shadow">
                    <h2 className="font-bold text-lg border-b w-full text-center py-1 px-0 mb-2">Login</h2>

                    <GoogleLogin
                        shape="pill"
                        useOneTap
                        onSuccess={onLogin}
                        theme="outline"
                        onError={() => {
                            console.log("Not able to sign in.");
                        }} />

                    {/* {<CustomLogin />} */}

                </div>

            </div>
        </div>
    </GoogleOAuthProvider>
}

function CustomLogin() {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),

    });
    return <button onClick={() => login()}>Login with google</button>
}

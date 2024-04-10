import { CredentialResponse, GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AxiosError } from "axios";
import backendUrls from "@/constants/backendUrls";
import http from "@/hooks/axiosConfig";
import { isMobile } from "react-device-detect";
import { addMinutes, format } from "date-fns";

const client_id = process.env.CLIENT_ID || "";

export default function Login() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const navigate = useNavigate();
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setShowLoginForm(false)

            navigate("/");
        }
    }, [])

    const onLogin = async (response: CredentialResponse) => {
        console.log(response);
        sessionStorage.clear();
        sessionStorage.setItem("token", response.credential as string);

        sessionStorage.setItem("startTime", addMinutes(new Date(), 59).getTime().toString());

        if (sessionExpired === true) {
            setSessionExpired(false)
        }

        http.post(backendUrls.users.create, null, {
            headers: {
                Authorization: "Bearer " + response.credential
            }
        }).then(res => {
            navigate("/");
        }).catch((err: AxiosError) => {
            if (err.response?.status === 409) {

            } else {

            }
            navigate("/");
        })
    }




    return <GoogleOAuthProvider clientId={client_id}>
        <div className="flex items-center justify-center  h-dvh w-dvw">
            <div className="border p-10 rounded flex flex-col w-96 items-center shadow-lg">
                <div className="bg-black rounded-lg w-14 p-2">
                    <img className="w-10" src="/app-icon.svg" alt="icon" />
                </div>
                <h3 className="prose pt-2">TradeMap</h3>
                {
                    sessionExpired && <h3>Session Expired. Please relogin.</h3>
                }

                <div className="space-y-4 mt-10 flex flex-col justify-center items-center w-full">
                    <h2 className="font-bold text-2xl border-b w-full text-center py-2 px-0 mb-2">Login </h2>

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

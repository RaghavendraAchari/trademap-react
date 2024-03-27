import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id = process.env.CLIENT_ID || "";

export default function Login() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setShowLoginForm(false)
        }
    }, [])

    return showLoginForm && <GoogleOAuthProvider clientId={client_id}>
        <GoogleLogin
            shape="pill"
            onSuccess={async (response) => {
                console.log(response);

                sessionStorage.clear();

                sessionStorage.setItem("token", JSON.stringify(response));

                navigate("/");
            }}
            theme="outline"
            onError={() => {
                console.log("Not able to sign in.");

            }} />
    </GoogleOAuthProvider>
}
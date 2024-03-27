"use client"
import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";



export function GoogleLoginComponent() {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setShowLoginForm(false)
        }
    }, [])

    return showLoginForm && <GoogleLogin
        shape="pill"
        useOneTap
        onSuccess={async (response) => {
            console.log(response);

            sessionStorage.clear();

            sessionStorage.setItem("token", JSON.stringify(response));


        }} theme="outline" auto_select={false}
        onError={() => {
            console.log("Not able to sign in.");

        }} />
}
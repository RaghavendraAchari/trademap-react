
"use client"

import { useEffect, useState } from "react"

export default function useUserLogin() {
    const [userLoggedIn, setUserLoggenIn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setUserLoggenIn(true)
        }
    })

    return userLoggedIn
}
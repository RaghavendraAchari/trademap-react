"use client"
import axios from "axios";

const token = sessionStorage.getItem("token")
let authorizationToken: string | null = null;

if (token) {
    const obj = JSON.parse(token);
    authorizationToken = obj.credential as string
}

const http = axios.create({
    headers: {
        Authorization: authorizationToken
    }
})

export default http
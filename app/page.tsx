"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ENDPOINT_PRACTICE } from "./constant/endpoint";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push(ENDPOINT_PRACTICE);
    });

    return <h1>Redirecting...</h1>;
}

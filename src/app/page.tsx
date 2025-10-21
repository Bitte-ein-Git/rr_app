"use client"; // needs to be a client component for redirection

import Loading from "@/components/common/loading"; // show loading indicator
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// page component for root path, redirects to /rooms
const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        // redirect to rooms page on component mount
        router.replace("/rooms");
    }, [router]);

    // display loading message while redirecting
    return <Loading>Redirecting...</Loading>;
};

export default HomePage;

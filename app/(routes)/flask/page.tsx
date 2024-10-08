"use client";

import React, { useEffect, useState } from "react";

export default function page() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.text())
            .then((data) => setMessage(data));
    }, []);

    return <div className='text-red'>{message}</div>;
}

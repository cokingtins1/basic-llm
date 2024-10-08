"use client";

import React, { useEffect, useState } from "react";

export default function page() {
    const [message, setMessage] = useState("");
    const [nodeMessage, setnodeMessage] = useState("");

    useEffect(() => {
        fetch("/api/hello")
            .then((res) => res.text())
            .then((data) => setMessage(data));
    }, []);

    useEffect(() => {
        fetch("/api/nextapi")
            .then((res) => res.json())
            .then((data) => setnodeMessage(data.message));
    }, []);

    return (
        <div className="text-white">
            <p>{message}</p>
            <p>{nodeMessage}</p>
        </div>
    );
}

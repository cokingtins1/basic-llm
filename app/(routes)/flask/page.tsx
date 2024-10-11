"use client";

import React, { useEffect, useState } from "react";

export default function page() {
    const [message, setMessage] = useState("");
    const [nodeMessage, setnodeMessage] = useState("");
    const [importMessage, setImportMessage] = useState("");
    const name = "Taylor";

    useEffect(() => {
        fetch("/api/flask/")
            .then((res) => res.text())
            .then((res) => {
                setMessage(res);
            });
    }, []);

    useEffect(() => {
        fetch(`/api/flask/greeting/${name}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setImportMessage(data.greeting);
            })
            .catch((error) => {
                console.error("Error fetching greeting:", error);
            });
    }, [name]);

    useEffect(() => {
        fetch("/api/nextapi")
            .then((res) => res.json())
            .then((data) => setnodeMessage(data.message))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="text-white">
            <p>{message}</p>
            <p>{nodeMessage}</p>
            <p>{importMessage}</p>
        </div>
    );
}

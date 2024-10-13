"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { promptSchema, TPromptSchema } from "@/app/libs/types";
import { useState } from "react";

export default function Page() {
    const [chatResponse, setChatResponse] = useState("");
    const [executionTime, setExecutionTime] = useState(0);

    const form = useForm<TPromptSchema>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const onSubmit = async (text: TPromptSchema) => {
        const t0 = new Date().getTime();
        const res = await fetch("/api/flask/cap", {
            method: "POST",
            body: JSON.stringify({
                prompt: text.prompt,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const responseData = await res.json();
            const t1 = new Date().getTime();
            setExecutionTime((t1 - t0) / 1000);
            setChatResponse(responseData.result);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="text-white"
                                        type="text"
                                        placeholder="ask your question"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                </form>
            </Form>
            {chatResponse && (
                <>
                    <p className="text-white">{chatResponse}</p>
                    <p className='text-white'>Time to response: {executionTime} seconds</p>
                </>
            )}
        </div>
    );
}

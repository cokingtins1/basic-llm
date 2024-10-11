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

    const form = useForm<TPromptSchema>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const onSubmit = async (text: TPromptSchema) => {
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
            setChatResponse(responseData.result.prompt);
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
            <p className="text-white">{chatResponse && chatResponse}</p>
        </div>
    );
}


"use client";
import * as React from "react"

import { useChatLogic } from "../hooks/useChatLogic";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ChatHistory from "./ChatHistory";
import InputForm from "./InputForm";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react";


export default function PromptForm() {

    const { prompt, setPrompt, responses, setResponses, loading, handleSubmit } = useChatLogic();

    useLocalStorage("chatHistory", responses, setResponses);

    return (
        <div className="w-full mx-auto mt-10 p-6 max-w-4xl overflow-hidden">
            <span
                className="absolute top-4 right-2 transform -translate-x-1/2"

            >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#16161e] border-none">
                        <DropdownMenuLabel className="text-muted-foreground">Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />


                        <DropdownMenuCheckboxItem className="text-destructive hover:bg-gray-700"
                            onClick={() => setResponses([])}
                        >
                            Clear Chat
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </span>

            {/* Flex container for chat history, using flex-col-reverse for bottom-to-top message flow */}
            <div className="space-y-4 overflow-y-auto max-h-96 custom-scrollbar flex flex-col-reverse">
                <ChatHistory responses={responses} loading={loading} />
            </div>

            {/* Input Form */}
            <InputForm prompt={prompt} setPrompt={setPrompt} loading={loading} handleSubmit={handleSubmit} />
        </div>
    );
}












